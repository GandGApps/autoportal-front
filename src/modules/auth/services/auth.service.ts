import {LoginFormModel} from './../form/LoginForm';
import AbstractServiceRepository from '../../../settings/abstrcations/repositories/AbstractServiceRepository';
import {AuthApiService} from './auth.api';
import {AuthUser} from '../models/AuthUser';

class AuthService extends AbstractServiceRepository {
  api: AuthApiService;

  constructor() {
    super();
    this.api = new AuthApiService();
  }

  questAuth = async () => {
    const {data} = await this.api.questAuth();

    return data as any as string;
  };

  login = async (form: LoginFormModel) => {
    const {data} = await this.api.login(form);

    return this.create<AuthUser>(AuthUser, data);
  };
}

export const authService = new AuthService();
