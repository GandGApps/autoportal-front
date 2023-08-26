import {Nullable} from '../../../settings/types/BaseTypes';
import {UserInfo} from '../models/UserInfo';

export interface UserStateModel {
  userInfo: Nullable<UserInfo>;

  isUserInfoLoad: boolean;
}
