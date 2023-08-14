import AbstractApiRepository from '../../../settings/abstrcations/repositories/AbstractApiRepository';

export class ApiOrganizationsService extends AbstractApiRepository {
  getCategories = async (city: string) => {
    return this.apiClient.get({
      url: '',
    });
  };

  getOrganizationFilter = async (categoryId: string) => {
    return this.apiClient.get({
      url: '',
    });
  };
}
