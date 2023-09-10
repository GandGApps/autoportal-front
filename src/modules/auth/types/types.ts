import {RegisterFormModel} from '../form/RegisterForm';
import {LoginFormModel} from './../form/LoginForm';

export interface AuthStateModel {
  loginForm: LoginFormModel;
  registerForm: RegisterFormModel;

  isAuth: boolean;
  isReady: boolean;
}
