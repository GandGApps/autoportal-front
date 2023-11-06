import AbstractApiRepository from '../../../settings/abstrcations/repositories/AbstractApiRepository';
import {Endpoints} from '../../../template/api/Endpoints';
import {CreateBannerDTO, FinanceDTO} from '../types/AdminTypes';

export class AdminApiService extends AbstractApiRepository {
  getUsers = (city: string) => {
    return this.apiClient.get({
      url: Endpoints.getUsers(city),
    });
  };

  getUserOrganizations = (dealerId: string) => {
    return this.apiClient.post({
      url: Endpoints.getUserOrganizations(dealerId),
    });
  };

  changeFinanceSettings = (dto: FinanceDTO) => {
    return this.apiClient.post({
      url: Endpoints.finance,
      data: dto,
    });
  };

  createBanner = (dto: CreateBannerDTO) => {
    return this.apiClient.post({
      url: Endpoints.banners(dto.city),
      data: dto,
    });
  };

  updateBanner = (dto: CreateBannerDTO, bannerId: string) => {
    return this.apiClient.put({
      url: Endpoints.changeBanner(bannerId),
      data: dto,
    });
  };

  deleteBanner = (bannerId: string) => {
    return this.apiClient.delete({
      url: Endpoints.changeBanner(bannerId),
    });
  };
}
