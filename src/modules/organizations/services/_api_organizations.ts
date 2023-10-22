import AbstractApiRepository from '../../../settings/abstrcations/repositories/AbstractApiRepository';
import {Endpoints} from '../../../template/api/Endpoints';
import {CreatetFormModel} from '../form/CreateForm';
import {
  CreateOrganizationDTO,
  CreateReviewDTO,
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

  createOrganization = async (dto: CreateOrganizationDTO) => {
    return this.apiClient.post({
      url: Endpoints.myOrganizations,
      data: dto,
    });
  };

  addFavoriteOrganization = async (id: string) => {
    return this.apiClient.post({
      url: Endpoints.changeFavorite(id),
    });
  };
  deleteFavoriteOrganization = async (id: string) => {
    return this.apiClient.delete({
      url: Endpoints.changeFavorite(id),
    });
  };

  getReviews = async (id: string) => {
    return this.apiClient.get({
      url: Endpoints.reviews(id),
    });
  };

  createReview = async (id: string, dto: CreateReviewDTO) => {
    return this.apiClient.post({
      url: Endpoints.reviews(id),
      data: dto,
    });
  };

  checkSubStore = async () => {
    return this.apiClient.get({
      url: Endpoints.checkRelease,
    });
  };

  getSubInfo = async () => {
    return this.apiClient.get({
      url: Endpoints.subInfo,
    });
  };

  getSubscribe = async (type: string, id: string) => {
    return this.apiClient.post({
      url: Endpoints.subscribe(type, id),
    });
  };
}
