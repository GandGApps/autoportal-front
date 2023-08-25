import {PromotionList} from './../models/PromotionList';
import {SearchServices} from './../models/SearchServices';
import {MockCategories} from '../mock/MockCategories';
import AbstractServiceRepository from '../../../settings/abstrcations/repositories/AbstractServiceRepository';
import {MockOrganizationFilter} from '../mock/MockOrganizationFilter';
import {Category} from '../models/Category';
import {OrganizationFilter} from '../models/OrganizationFilter';
import {ApiOrganizationsService} from './ApiOrganizationsService';
import {MockBanners} from '../mock/MockBanners';
import {File} from '../../files/models/File';
import {MockSearchServices} from '../mock/MockSearchServices';
import {OrganizationList} from '../models/OrganizationList';
import {MockOrganizationList} from '../mock/MockOrganizationList';
import {CurrentOrganization} from '../models/CurrentOrganization';
import {MockCurrentOrganization} from '../mock/MockOrganization';
import {MockPromotions} from '../mock/MockPromotions';

export class OrganizationsService extends AbstractServiceRepository {
  api: ApiOrganizationsService;

  constructor() {
    super();
    this.api = new ApiOrganizationsService();
  }

  getBanners = async (city: string) => {
    // const {data} = await this.api.getBanners(city)

    const data = MockBanners;

    return this.createList<File>(File, data);
  };

  getSearchServices = async (query: string) => {
    // const {data} = await this.api.getSearchServices(query)

    const data = MockSearchServices;

    return this.createList<SearchServices>(SearchServices, data);
  };

  getCategories = async (city: string) => {
    // const {data} = await this.api.getCategories(city);

    const data = MockCategories;

    return this.createList<Category>(Category, data);
  };

  getOrganizationFilter = async (categoryId: string) => {
    // const {data} = await this.api.getOrganizationFilter(categoryId);

    const data = MockOrganizationFilter;

    return this.create<OrganizationFilter>(OrganizationFilter, data);
  };

  getOrganizationList = async () => {
    // const {data} = await this.api.getOrganizationList()

    const data = MockOrganizationList;

    return this.createList<OrganizationList>(OrganizationList, data);
  };

  getCurrentOrganization = async (_id: string) => {
    // const {data} = await this.api.getCurrentOrganization(_id);

    const data = MockCurrentOrganization;

    return this.create<CurrentOrganization>(CurrentOrganization, data);
  };

  getPromotionsList = async () => {
    // const {data} = await this.api.getPromotionsList();

    const data = MockPromotions;

    return this.createList<PromotionList>(PromotionList, data);
  };

  getFavoritesList = async () => {
    // const {data} = await this.api.getFavoritesList();

    const data = MockOrganizationList;

    return this.createList<OrganizationList>(OrganizationList, data);
  };
}
