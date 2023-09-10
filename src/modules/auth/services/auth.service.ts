import AbstractServiceRepository from '../../../settings/abstrcations/repositories/AbstractServiceRepository';
import {AuthApiService} from './auth.api';

class AuthService extends AbstractServiceRepository {
  api: AuthApiService;

  constructor() {
    super();
    this.api = new AuthApiService();
  }

  setToken = (token: string) => {
    this.api.setAccessToken(token);
  };

  questAuth = async () => {
    const {data} = await this.api.questAuth();

    return data as any as string;
  };
}

export const authService = new AuthService();
