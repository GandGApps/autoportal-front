import {PersonalOrganizations} from './../models/PersonalOrganizations';
import {PromotionList} from './../models/PromotionList';
import {SearchServices} from './../models/SearchServices';
import AbstractServiceRepository from '../../../settings/abstrcations/repositories/AbstractServiceRepository';
import {Category} from '../models/Category';
import {OrganizationFilter} from '../models/OrganizationFilter';
import {OrganizationList} from '../models/OrganizationList';
import {CurrentOrganization} from '../models/CurrentOrganization';
import {ApiOrganizationsService} from './_api_organizations';
import {CreatedStatus} from '../models/CreatedStatus';
import {Review} from '../models/Review';
import {FiltertFormModel} from '../form/FilterForm';
import {CreateReviewDTO, OrganizationsDTO} from '../types/OrganizationTypes';
import {OrganizationHelper} from '../helpers/OrganizationHelper';
import {CreatetFormModel} from '../form/CreateForm';
import {Message} from '../../auth/models/Message';
import {FavoriteOrganization} from '../models/FavoriteOrganization';

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

    const formatted = OrganizationHelper.formattedScheduleDTO(
      form.schedule || [],
    );

    const scheduleFilter = formatted ? {scheduleFilter: formatted} : {};

    const dto: OrganizationsDTO = {
      city: form.city,
      categoryId: form.category?._id!,
      servicesId: form.typeService || [],
      ...sortType,
      ...scheduleFilter,
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
    const {data} = await this.api.getPromotionsList();

    return this.createList<PromotionList>(PromotionList, data);
  };

  getFavoritesList = async () => {
    const {data} = await this.api.getFavoritesList();

    return this.createList<FavoriteOrganization>(FavoriteOrganization, data);
  };

  getPersonalOrganizations = async () => {
    const {data} = await this.api.getPersonalOrganizations();

    return this.createList<PersonalOrganizations>(PersonalOrganizations, data);
  };

  getCreatedStatus = async () => {
    const {data} = await this.api.getCreatedStatus();

    return this.create<CreatedStatus>(CreatedStatus, data);
  };

  createOrganization = async (createForm: CreatetFormModel) => {
    const dto = await OrganizationHelper.createOrganizationDto(createForm);

    const {data} = await this.api.createOrganization(dto);

    return this.create<Message>(Message, data);
  };

  addFavoriteOrganization = async (id: string) => {
    const {data} = await this.api.addFavoriteOrganization(id);

    return this.create<Message>(Message, data);
  };

  deleteFavoriteOrganization = async (id: string) => {
    const {data} = await this.api.deleteFavoriteOrganization(id);

    return this.create<Message>(Message, data);
  };

  getReviews = async (id: string) => {
    const {data} = await this.api.getReviews(id);

    return this.createList<Review>(Review, data);
  };

  createReview = async (id: string, dto: CreateReviewDTO) => {
    const {data} = await this.api.createReview(id, dto);

    return this.create<Message>(Message, data);
  };
}

export const organizationService = new OrganizationsService();
