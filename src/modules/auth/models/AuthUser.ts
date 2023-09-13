import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
import {Nullable} from '../../../settings/types/BaseTypes';
import {UserInfo} from '../../user/models/UserInfo';

export class AuthUser extends AbstractModel {
  token: string = '';
  userData: Nullable<UserInfo> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
