import {UserInfo} from './../models/UserInfo';
export type EditFormKeys = 'city' | 'full_name';

export interface EditFormModel {
  city: string;
  full_name: string;
}

export interface EditFormProps {
  key: EditFormKeys;
  value: string;
}

export const DefaultEditForm: EditFormModel = {
  city: '',
  full_name: '',
};

export const isEditFormValid = (editForm: EditFormModel) => {
  return editForm.full_name.length;
};

export const isNewEditValue = (user: UserInfo, editForm: EditFormModel) => {
  return user.city !== editForm.city || user.full_name !== editForm.full_name;
};
