import AbstractApiRepository from '../../../settings/abstrcations/repositories/AbstractApiRepository';
import {Endpoints} from '../../../template/api/Endpoints';
import {
  CreateExtServieDTO,
  CreateOrganizationDTO,
  CreatePromotionDTO,
  CreateReviewDTO,
  CreateServiceDTO,
  GetPromotionDTO,
  OrganizationsDTO,
  ReportDTO,
  UpdateServiceDTO,
} from '../types/OrganizationTypes';

export class ApiOrganizationsService extends AbstractApiRepository {
  getBanners = async (city: string) => {
    return this.apiClient.get({
      url: Endpoints.banners(city),
    });
  };

  getCategories = async () => {
    return this.apiClient.get({
      url: Endpoints.categories,
    });
  };

  getSearchServices = async (query: string) => {
    return this.apiClient.post({
      url: Endpoints.searchSubServices(query),
    });
  };

  getServices = async (categoryId: string) => {
    return this.apiClient.get({
      url: Endpoints.services(categoryId),
    });
  };

  createService = async (dto: CreateServiceDTO) => {
    return this.apiClient.post({
      url: Endpoints.service,
      data: dto,
    });
  };

  updateService = async (dto: UpdateServiceDTO) => {
    const {serviceId, ...updateDto} = dto;
    return this.apiClient.put({
      url: Endpoints.changeService(serviceId),
      data: updateDto,
    });
  };

  deleteService = async (serviceId: string) => {
    return this.apiClient.delete({
      url: Endpoints.changeService(serviceId),
    });
  };

  createExtService = async (dto: CreateExtServieDTO) => {
    return this.apiClient.post({
      url: Endpoints.extServices,
      data: dto,
    });
  };

  getExtServices = async (serviceId: string) => {
    return this.apiClient.get({
      url: Endpoints.getExtServices(serviceId),
    });
  };

  getOrganizationFilter = async (catId: string) => {
    return this.apiClient.get({
      url: Endpoints.filter(catId),
    });
  };

  getOrganizationList = async (dto: OrganizationsDTO) => {
    console.log(dto);
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

  getPromotionsList = async (dto: GetPromotionDTO) => {
    return this.apiClient.get({
      url: Endpoints.promotions(dto.city, dto.categoryId),
    });
  };

  createPromotion = async (dto: CreatePromotionDTO) => {
    const {id, ...bodyDTO} = dto;
    return this.apiClient.post({
      url: Endpoints.createPromotion(id),
      data: bodyDTO,
    });
  };
  updatePromotion = async (dto: CreatePromotionDTO) => {
    const {id, ...bodyDTO} = dto;
    return this.apiClient.put({
      url: Endpoints.updatePromotion(id),
      data: bodyDTO,
    });
  };
  deletePromotion = async (id: string) => {
    return this.apiClient.delete({
      url: Endpoints.deletePromotion(id),
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

  updateOrganization = async (dto: CreateOrganizationDTO) => {
    return this.apiClient.put({
      url: Endpoints.updateOrganization(dto.id!),
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

  approveSubscribe = async (id: string, type: string) => {
    return this.apiClient.post({
      url: Endpoints.approveSubscribe(id, type),
    });
  };

  deactivateSubscribe = async (id: string) => {
    return this.apiClient.post({
      url: Endpoints.deactivate(id),
    });
  };

  sendReport = async (dto: ReportDTO) => {
    return this.apiClient.post({
      url: Endpoints.sendReport(dto.id),
      data: {comment: dto.comment},
    });
  };

  resumeSubscribe = async (id: string) => {
    return this.apiClient.post({
      url: Endpoints.resumeSubscribe(id),
    });
  };

  removeService = (id: string) => {
    return this.apiClient.delete({
      url: Endpoints.removeService(id),
    });
  };

  getContacts = async () => {
    return this.apiClient.get({
      url: Endpoints.contacts,
    });
  };

  getOffer = async () => {
    return this.apiClient.get({
      url: Endpoints.offer,
    });
  };

  getPolicy = async () => {
    return this.apiClient.get({
      url: Endpoints.policy,
    });
  };
}
