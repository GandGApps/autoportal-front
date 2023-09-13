import {isEmailValid} from './../../user/form/UserEditForm';
import {Notifications} from '../../../template/notifications/Notifications';

export type LoginFormKeys = 'phone_number';

export interface LoginFormProps {
  key: LoginFormKeys;
  value: string;
}

export interface LoginFormModel {
  phone_number: string;
}

export type LoginFormValue = string;

export const DefaultLoginForm: LoginFormModel = {
  phone_number: '',
};

export const checkLoginValidation = (form: LoginFormModel) => {
  if (form.phone_number.length !== 18) {
    Notifications.error('Некорректный номер');
    return false;
  }

  return true;
};
