import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {Platform} from 'react-native';

import {appConfig} from '../../../appConfig';

import {IAxiosConfig, IAxiosResponse, IExcludedUrl} from './IAxiosInterfaces';
import {IApiClient} from '../ApiInterfaces';
import {Notifications} from '../../../template/notifications/Notifications';

export default class AxiosClient implements IApiClient {
  readonly SUCCESS_STATUSES = [200, 201];
  readonly SERVER_ERROR = 500;
  readonly VERSION_NOT_VALID = 426;
  readonly BAN_USER = 405;
  readonly PAY_ERROR = 406;

  api: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.api = axios.create(config);
    this.api.defaults.baseURL = appConfig.apiUrl;

    this.setInterceptorRequest();
    this.setInterceptorResponse();
  }

  setAccessToken = (token: string) => {
    this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  clearAccessToken = () => {
    this.api.defaults.headers.common.Authorization = '';
  };

  get = <T extends {}>(config: IAxiosConfig) => {
    return this.api.get<IAxiosResponse<T>>(config.url, config.config);
  };

  post = <T extends {}>(config: IAxiosConfig) => {
    return this.api.post<IAxiosResponse<T>>(
      config.url,
      config.data,
      config.config,
      // {...config.config, transformRequest: (data) => data}
    );
  };

  put = <T extends {}>(config: IAxiosConfig) => {
    return this.api.put<IAxiosResponse<T>>(
      config.url,
      config.data,
      config.config,
    );
  };

  delete = <T extends {}>(config: IAxiosConfig) => {
    return this.api.delete<IAxiosResponse<T>>(config.url, config.config);
  };

  protected getApiErrors = (error: any) => {
    if (error?.error) {
      // TODO: Сделать уведомление
      // toast.error(error.error, {
      //   duration: 1500,
      // });
    }
  };

  protected excludedUrls(response: any) {
    const excluded: IExcludedUrl[] = [];
    let isExclude = false;

    const request = response.request;
    const config = response.config;

    excluded.forEach(item => {
      if (
        request.responseURL.includes(item.url) &&
        config.method.toLowerCase() === item.method.toLowerCase()
      ) {
        isExclude = true;
      }
    });

    return isExclude;
  }

  private setInterceptorRequest = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    this.api.interceptors.request.use(
      async config => {
        config.headers.set(
          'content-type',
          config.headers['content-type'] || 'application/json',
        );
        config.headers.set('App-Platform', Platform.OS);
        config.headers.set('App-DeviceId', appConfig.deviceId);
        config.headers.set('App-Version', appConfig.version);

        return {
          ...config,
          headers: config.headers,
        };
      },
      error => Promise.reject(error),
    );
  };

  private setInterceptorResponse = () => {
    this.api.interceptors.response.use(
      response => {
        const isExcluded = this.excludedUrls(response);

        if (!this.SUCCESS_STATUSES.includes(response.status)) {
          return Promise.reject(response);
        }

        return response;
      },
      error => {
        if (error.response?.data?.error) {
          Notifications.error(error.response.data.error);
        }

        if (error.response?.status === this.BAN_USER) {
          Notifications.error('Ваш аккаунт заблокирован');
        }

        if (error.response?.status === this.PAY_ERROR) {
          Notifications.error('Оплата не прошла');
        }

        return Promise.reject(error);
      },
    );
  };
}
