import AbstractServiceRepository from '../../../settings/abstrcations/repositories/AbstractServiceRepository';
import {MockUserInfo} from '../mock/MockUserInfo';
import {UserInfo} from '../models/UserInfo';
import {ApiUser} from './_api_user';

export class UserService extends AbstractServiceRepository {
  api: ApiUser;

  constructor() {
    super();
    this.api = new ApiUser();
  }

  getUserInfo = async () => {
    // const {data} = await this.api.getUserInfo();

    const data = MockUserInfo;

    return this.create<UserInfo>(UserInfo, data);
  };
}
