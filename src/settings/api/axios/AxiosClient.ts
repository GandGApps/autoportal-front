import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

import {IAxiosConfig, IAxiosResponse, IExcludedUrl} from './IAxiosInterfaces';

import {IApiClient} from '../ApiInterfaces';
import {appConfig} from '../../../appConfig';

export default class AxiosClient implements IApiClient {
  readonly SUCCESS_STATUSES = [200, 201];
  readonly SERVER_ERROR = 500;
  readonly VERSION_NOT_VALID = 426;

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
    const excluded: IExcludedUrl[] = [{url: '/categories', method: 'GET'}];
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
        config.headers.set('Content-Type', 'application/json');
        config.headers.set('Accept-Timezone', timeZone);

        return {...config, headers: config.headers};
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
        const isExcluded = this.excludedUrls(error.response);

        if (!isExcluded) {
          this.getApiErrors(error?.response?.data);
        }

        if (error.response?.status === this.SERVER_ERROR) {
          // TODO: Сделать уведомление
          // toast.error('Ошибка сервера', {
          //   duration: 1500,
          // });
        }

        return Promise.reject(error);
      },
    );
  };
}
