import {OrganizationList} from './../../organizations/models/OrganizationList';
import {getSubInfo} from './../../organizations/thunks/subscribe.thunk';
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

  getUsers = async (city: string) => {
    const {data} = await this.api.getUsers(city);

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

  createBanner = async (dto: CreateBannerDTO) => {
    const {data} = await this.api.createBanner(dto);

    return this.create<Message>(Message, data);
  };
}

export const adminService = new AdminService();
