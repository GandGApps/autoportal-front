import {RegisterFormModel} from './../form/RegisterForm';
import {LoginFormModel} from './../form/LoginForm';
import AbstractServiceRepository from '../../../settings/abstrcations/repositories/AbstractServiceRepository';
import {AuthApiService} from './auth.api';
import {AuthUser} from '../models/AuthUser';
import {Message} from '../models/Message';
import {CodeDTO} from '../types/types';

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

  registerAuth = async (regForm: RegisterFormModel) => {
    const {data} = await this.api.registerAuth(regForm.phone_number, {
      city: regForm.city,
      full_name: regForm.full_name,
    });

    return this.create<Message>(Message, data);
  };

  getCode = async (form: LoginFormModel | RegisterFormModel) => {
    const {data} = await this.api.getCode({phone_number: form.phone_number});

    return this.create<Message>(Message, data);
  };

  sendCode = async (dto: CodeDTO) => {
    const {data} = await this.api.sendCode(dto);

    return this.create<AuthUser>(AuthUser, data);
  };
}

export const authService = new AuthService();
