import {PersonalOrganizations} from './../models/PersonalOrganizations';
import {PromotionList} from './../models/PromotionList';
import {SearchServices} from './../models/SearchServices';
import AbstractServiceRepository from '../../../settings/abstrcations/repositories/AbstractServiceRepository';
import {Category} from '../models/Category';
import {OrganizationFilter} from '../models/OrganizationFilter';
import {OrganizationList} from '../models/OrganizationList';
import {MockOrganizationList} from '../mock/MockOrganizationList';
import {CurrentOrganization} from '../models/CurrentOrganization';
import {MockPromotions} from '../mock/MockPromotions';
import {ApiOrganizationsService} from './_api_organizations';
import {CreatedStatus} from '../models/CreatedStatus';
import {MockPersonalOrganizations} from '../mock/MockPersonalOrganizations';
import {MockReviews} from '../mock/MockReviews';
import {Review} from '../models/Review';
import {FiltertFormModel} from '../form/FilterForm';
import {OrganizationsDTO} from '../types/OrganizationTypes';
import {OrganizationHelper} from '../helpers/OrganizationHelper';

export class OrganizationsService extends AbstractServiceRepository {
  api: ApiOrganizationsService;

  constructor() {
    super();
    this.api = new ApiOrganizationsService();
  }

  getBanners = async (city: string) => {
    const {data} = await this.api.getBanners(city);

    return data as any as string[];
  };

  getSearchServices = async (query: string) => {
    const {data} = await this.api.getSearchServices(query);

    return this.createList<SearchServices>(SearchServices, data);
  };

  getCategories = async () => {
    const {data} = await this.api.getCategories();

    return this.createList<Category>(Category, data);
  };

  getOrganizationFilter = async (catId: string) => {
    const {data} = await this.api.getOrganizationFilter(catId);

    return this.create<OrganizationFilter>(OrganizationFilter, data);
  };

  getOrganizationList = async (form: FiltertFormModel) => {
    const sortType = form.sort ? {sortType: form.sort} : {};

    const dto: OrganizationsDTO = {
      city: form.city,
      categoryId: form.category?._id!,
      servicesId: form.typeService || [],
      ...sortType,
      scheduleFilter: OrganizationHelper.formattedScheduleDTO(
        form.schedule || [],
      ),
    };

    const {data} = await this.api.getOrganizationList(dto);

    return this.createList<OrganizationList>(OrganizationList, data);
  };

  getCurrentOrganization = async (_id: string) => {
    const {data} = await this.api.getCurrentOrganization(_id);

    return this.create<CurrentOrganization>(
      CurrentOrganization,
      (data as any).organisation,
    );
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

  getPersonalOrganizations = async () => {
    // const {data} = await this.api.getPersonalOrganizations();
    const data = MockPersonalOrganizations;

    return this.createList<PersonalOrganizations>(PersonalOrganizations, data);
  };

  getCreatedStatus = async () => {
    // const {data} = await this.api.getCreatedStatus();
    const data = {
      createdStatus: true,
    };

    return this.create<CreatedStatus>(CreatedStatus, data);
  };

  getReviews = async () => {
    // const {data} = await this.api.getReviews();
    const data = MockReviews;

    return this.createList<Review>(Review, data);
  };
}
