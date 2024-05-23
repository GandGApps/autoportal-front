import {EditFormModel} from './../form/UserEditForm';
import AbstractApiRepository from '../../../settings/abstrcations/repositories/AbstractApiRepository';
import {Endpoints} from '../../../template/api/Endpoints';

export class ApiUser extends AbstractApiRepository {
  getUserInfo = () => {
    return this.apiClient.get({
      url: Endpoints.userInfo,
    });
  };

  editUser = (form: EditFormModel) => {
    return this.apiClient.post({
      url: Endpoints.editUser,
      data: form,
    });
  };

  deleteUser = () => {
    return this.apiClient.delete({
      url: Endpoints.deleteUser,
    });
  };
}
