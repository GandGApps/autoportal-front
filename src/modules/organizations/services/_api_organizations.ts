import AbstractApiRepository from '../../../settings/abstrcations/repositories/AbstractApiRepository';
import {Endpoints} from '../../../template/api/Endpoints';
import {FiltertFormModel} from '../form/FilterForm';
import {OrganizationsDTO} from '../types/OrganizationTypes';

export class ApiOrganizationsService extends AbstractApiRepository {
  getBanners = async (city: string) => {
    return this.apiClient.get({
      url: '',
    });
  };

  getCategories = async () => {
    return this.apiClient.get({
      url: Endpoints.categories,
    });
  };

  getSearchServices = async (query: string) => {
    return this.apiClient.get({
      url: Endpoints.searchSubServices(query),
    });
  };

  getOrganizationFilter = async (form: OrganizationsDTO) => {
    return this.apiClient.post({
      url: Endpoints.organizations,
      data: form,
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

  getPromotionsList = async () => {
    return this.apiClient.get({
      url: '',
    });
  };

  getFavoritesList = async () => {
    return this.apiClient.get({
      url: '',
    });
  };

  getCreatedStatus = async () => {
    return this.apiClient.get({
      url: '',
    });
  };

  getPersonalOrganizations = async () => {
    return this.apiClient.get({
      url: '',
    });
  };

  getReviews = async () => {
    return this.apiClient.get({
      url: '',
    });
  };
}
