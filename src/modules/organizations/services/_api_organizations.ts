import AbstractApiRepository from '../../../settings/abstrcations/repositories/AbstractApiRepository';
import {Endpoints} from '../../../template/api/Endpoints';
import {CreatetFormModel} from '../form/CreateForm';
import {
  CreateOrganizationDTO,
  OrganizationsDTO,
} from '../types/OrganizationTypes';

export class ApiOrganizationsService extends AbstractApiRepository {
  getBanners = async (city: string) => {
    return this.apiClient.get({
      url: Endpoints.banners,
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

  getOrganizationFilter = async (catId: string) => {
    return this.apiClient.get({
      url: Endpoints.filter(catId),
    });
  };

  getOrganizationList = async (dto: OrganizationsDTO) => {
    return this.apiClient.post({
      url: Endpoints.organizations,
      data: dto,
    });
  };

  getCurrentOrganization = async (_id: string) => {
    return this.apiClient.get({
      url: Endpoints.currentOrganization(_id),
    });
  };

  getPromotionsList = async () => {
    return this.apiClient.get({
      url: Endpoints.promotions,
    });
  };

  getFavoritesList = async () => {
    return this.apiClient.get({
      url: Endpoints.favorites,
    });
  };

  getCreatedStatus = async () => {
    return this.apiClient.get({
      url: Endpoints.createdStatus,
    });
  };

  getPersonalOrganizations = async () => {
    return this.apiClient.get({
      url: Endpoints.myOrganizations,
    });
  };

  getReviews = async () => {
    return this.apiClient.get({
      url: '',
    });
  };

  createOrganization = async (dto: CreateOrganizationDTO) => {
    return this.apiClient.post({
      url: Endpoints.myOrganizations,
      data: dto,
    });
  };
}
