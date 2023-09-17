import {Nullable} from '../../../settings/types/BaseTypes';
import {EditFormModel} from '../form/UserEditForm';
import {UserInfo} from '../models/UserInfo';

export interface UserStateModel {
  userInfo: Nullable<UserInfo>;

  editForm: EditFormModel;

  isUserInfoLoad: boolean;
  isUserEditLoad: boolean;
}
