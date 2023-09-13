import AbstractApiRepository from '../../../settings/abstrcations/repositories/AbstractApiRepository';
import {Endpoints} from '../../../template/api/Endpoints';
import {LoginFormModel} from '../form/LoginForm';

export class AuthApiService extends AbstractApiRepository {
  setAccessToken = (token: string) => {
    this.apiClient.setAccessToken(token);
  };

  clearAccessToken = () => {
    this.apiClient.clearAccessToken();
  };

  questAuth = () => {
    return this.apiClient.post({
      url: Endpoints.guestAuth,
    });
  };

  login = (form: LoginFormModel) => {
    return this.apiClient.post({
      url: Endpoints.login,
      data: form,
    });
  };
}
