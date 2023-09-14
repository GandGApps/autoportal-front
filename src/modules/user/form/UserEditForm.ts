import {MaskHelper} from '../../../helper/MaskHelper';
import {UserInfo} from './../models/UserInfo';
export type EditFormKeys = 'city' | 'fullName' | 'phone';

export interface EditFormModel {
  city: string;
  fullName: string;
  phone: string;
}

export interface EditFormProps {
  key: EditFormKeys;
  value: string;
}

export const DefaultEditForm: EditFormModel = {
  city: '',
  fullName: '',
  phone: '',
};

export const isEditFormValid = (editForm: EditFormModel) => {
  return editForm.fullName.length > 0 && editForm.phone.length === 18;
};

export const isNewEditValue = (user: UserInfo, editForm: EditFormModel) => {
  return (
    user.city !== editForm.city ||
    user.full_name !== editForm.fullName ||
    user.phone_number !== MaskHelper.clearFormat(editForm.phone)
  );
};
