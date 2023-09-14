import AbstractApiRepository from '../../../settings/abstrcations/repositories/AbstractApiRepository';
import {Endpoints} from '../../../template/api/Endpoints';

export class ApiUser extends AbstractApiRepository {
  getUserInfo = () => {
    return this.apiClient.get({
      url: Endpoints.userInfo,
    });
  };
}
