import {EditFormModel} from './../form/UserEditForm';
import AbstractServiceRepository from '../../../settings/abstrcations/repositories/AbstractServiceRepository';

import {UserInfo} from '../models/UserInfo';
import {ApiUser} from './_api_user';
import {Message} from '../../auth/models/Message';

export class UserService extends AbstractServiceRepository {
  api: ApiUser;

  constructor() {
    super();
    this.api = new ApiUser();
  }

  getUserInfo = async () => {
    const {data} = await this.api.getUserInfo();

    return this.create<UserInfo>(UserInfo, data);
  };

  editUser = async (form: EditFormModel) => {
    const {data} = await this.api.editUser(form);

    return this.create<UserInfo>(UserInfo, data);
  };
}

export const userService = new UserService();
