import {RegisterFormModel} from '../form/RegisterForm';
import {LoginFormModel} from './../form/LoginForm';

export interface AuthStateModel {
  loginForm: LoginFormModel;
  registerForm: RegisterFormModel;

  title: string;

  type: AuthType;

  isAuth: boolean;
  isReady: boolean;
}

export interface CallDto {
  phone_number: string;
}

export interface CodeDTO {
  phone_number: string;
  confCode: string;
}

export interface RegisterDTO {
  city: string;
  full_name: string;
}

export type AuthType = 'Вход' | 'Регистрация';
