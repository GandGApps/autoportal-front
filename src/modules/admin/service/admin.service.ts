import {OrganizationList} from './../../organizations/models/OrganizationList';
import {CreateBannerDTO, FinanceDTO} from './../types/AdminTypes';
import AbstractServiceRepository from '../../../settings/abstrcations/repositories/AbstractServiceRepository';
import {Dealer} from '../models/Dealer';
import {AdminApiService} from './admin.api';
import {Message} from '../../auth/models/Message';

class AdminService extends AbstractServiceRepository {
  api: AdminApiService;

  constructor() {
    super();
    this.api = new AdminApiService();
  }

  getUsers = async (city: string, dealerId?: string) => {
    const {data} = await this.api.getUsers(city, dealerId);

    return this.createList<Dealer>(Dealer, data);
  };

  changeFinanceSettings = async (dto: FinanceDTO) => {
    const {data} = await this.api.changeFinanceSettings(dto);

    return this.create<Message>(Message, data);
  };

  getUserOrganizations = async (dealerId: string) => {
    const {data} = await this.api.getUserOrganizations(dealerId);

    return this.createList<OrganizationList>(OrganizationList, data);
  };

  createUpdateBanner = async (dto: CreateBannerDTO, bannerId?: string) => {
    if (bannerId) {
      const {data} = await this.api.updateBanner(dto, bannerId);
      console.log('my data', data);
      console.log('my dto', dto);

      return this.create<Message>(Message, data);
    }

    const {data} = await this.api.createBanner(dto);

    return this.create<Message>(Message, data);
  };

  deleteBanner = async (bannerId: string) => {
    const {data} = await this.api.deleteBanner(bannerId);

    return this.create<Message>(Message, data);
  };

  banUser = async (id: string) => {
    const {data} = await this.api.banUser(id);

    return this.create<Message>(Message, data);
  };
}

export const adminService = new AdminService();
