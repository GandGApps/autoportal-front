import AbstractServiceRepository from '../../../settings/abstrcations/repositories/AbstractServiceRepository';
import {MockOrganizationFilter} from '../mock/MockOrganizationFilter';
import {Category} from '../models/Category';
import {OrganizationFilter} from '../models/OrganizationFilter';
import {ApiOrganizationsService} from './ApiOrganizationsService';

export class OrganizationsService extends AbstractServiceRepository {
  api: ApiOrganizationsService;

  constructor() {
    super();
    this.api = new ApiOrganizationsService();
  }

  getCategories = async (city: string) => {
    const {data} = await this.api.getCategories(city);

    return this.createList<Category>(Category, data);
  };

  getOrganizationFilter = async (categoryId: string) => {
    // const {data} = await this.api.getOrganizationFilter(categoryId);

    const data = MockOrganizationFilter;

    return this.create<OrganizationFilter>(OrganizationFilter, data);
  };
}
