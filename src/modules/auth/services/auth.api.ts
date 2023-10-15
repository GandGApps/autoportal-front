import AbstractApiRepository from '../../../settings/abstrcations/repositories/AbstractApiRepository';
import {Endpoints} from '../../../template/api/Endpoints';
import {LoginFormModel} from '../form/LoginForm';
import {AdminDTO, CallDto, CodeDTO, RegisterDTO} from '../types/types';

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

  registerAuth = (dto: RegisterDTO) => {
    return this.apiClient.post({
      url: Endpoints.editUser,
      data: dto,
    });
  };

  getCode = (form: CallDto) => {
    return this.apiClient.post({
      url: Endpoints.getCode,
      data: form,
    });
  };

  sendCode = (dto: CodeDTO) => {
    return this.apiClient.post({
      url: Endpoints.sendCode,
      data: dto,
    });
  };

  adminLogin = (dto: AdminDTO) => {
    return this.apiClient.post({
      url: Endpoints.adminLogin,
    });
  };
}
