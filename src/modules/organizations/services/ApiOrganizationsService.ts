import AbstractApiRepository from '../../../settings/abstrcations/repositories/AbstractApiRepository';

export class ApiOrganizationsService extends AbstractApiRepository {
  getCategories = () => {
    this.apiClient.get({
      url: '',
    });
  };
}
