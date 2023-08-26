import AbstractApiRepository from '../../../settings/abstrcations/repositories/AbstractApiRepository';

export class ApiUser extends AbstractApiRepository {
  getUserInfo = () => {
    return this.apiClient.get({
      url: '',
    });
  };
}
