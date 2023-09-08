export type LoginFormKeys = 'email' | 'password';

export interface LoginFormProps {
  key: LoginFormKeys;
  value: string;
}

export interface LoginFormModel {
  email: string;
  password: string;
}

export type LoginFormValue = string;

export const DefaultLoginForm: LoginFormModel = {
  email: '',
  password: '',
};
