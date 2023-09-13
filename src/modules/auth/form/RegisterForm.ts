import {Notifications} from '../../../template/notifications/Notifications';

export type RegisterFormKeys = 'full_name' | 'phone_number' | 'city';

export interface RegisterFormProps {
  key: RegisterFormKeys;
  value: string;
}

export interface RegisterFormModel {
  full_name: string;
  phone_number: string;
  city: string;
}

export type RegisterFormValue = string;

export const DefaultRegisterForm: RegisterFormModel = {
  full_name: '',
  phone_number: '',
  city: '',
};

export const checkRegisterValidation = (form: RegisterFormModel) => {
  if (!form.full_name.length) {
    Notifications.error('Не указано имя');
    return false;
  }

  if (!form.city.length) {
    Notifications.error('Не указан город');
    return false;
  }

  if (form.phone_number.length !== 18) {
    Notifications.error('Некорректный номер');
    return false;
  }

  return true;
};
