import {MaskHelper} from '../../../helper/MaskHelper';
import {UserInfo} from './../models/UserInfo';
export type EditFormKeys = 'city' | 'fullName' | 'phone' | 'email';

export interface EditFormModel {
  city: string;
  fullName: string;
  phone: string;
  email: string;
}

export interface EditFormProps {
  key: EditFormKeys;
  value: string;
}

export const DefaultEditForm: EditFormModel = {
  city: '',
  fullName: '',
  phone: '',
  email: '',
};

export const isEmailValid = (email: string) => {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  return EMAIL_REGEXP.test(email);
};

export const isEditFormValid = (editForm: EditFormModel) => {
  return (
    editForm.fullName.length > 5 &&
    editForm.phone.length === 18 &&
    isEmailValid(editForm.email)
  );
};

export const isNewEditValue = (user: UserInfo, editForm: EditFormModel) => {
  return (
    user.city !== editForm.city ||
    user.full_Name !== editForm.fullName ||
    user.phone_number !== MaskHelper.clearFormat(editForm.phone) ||
    user.email !== editForm.email
  );
};
