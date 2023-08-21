import AbstractApiRepository from '../../../settings/abstrcations/repositories/AbstractApiRepository';

export class ApiOrganizationsService extends AbstractApiRepository {
  getBanners = async (city: string) => {
    return this.apiClient.get({
      url: '',
    });
  };

  getCategories = async (city: string) => {
    return this.apiClient.get({
      url: '',
    });
  };

  getSearchServices = async (query: string) => {
    return this.apiClient.get({
      url: '',
    });
  };

  getOrganizationFilter = async (categoryId: string) => {
    return this.apiClient.get({
      url: '',
    });
  };

  getOrganizationList = async () => {
    return this.apiClient.post({
      url: '',
    });
  };

  getCurrentOrganization = async (_id: string) => {
    return this.apiClient.get({
      url: '',
    });
  };
}
