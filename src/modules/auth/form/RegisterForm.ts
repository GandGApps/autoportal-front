export type RegisterFormKeys =
  | 'full_name'
  | 'phone_number'
  | 'city'
  | 'email'
  | 'password'
  | 'conf_password';

export interface RegisterFormProps {
  key: RegisterFormKeys;
  value: string;
}

export interface RegisterFormModel {
  full_name: string;
  phone_number: string;
  city: string;
  email: string;
  password: string;
  conf_password: string;
}

export type RegisterFormValue = string;

export const DefaultRegisterForm: RegisterFormModel = {
  full_name: '',
  phone_number: '',
  city: '',
  email: '',
  password: '',
  conf_password: '',
};
