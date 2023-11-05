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
import {
  CreatePromotionDTO,
  CreateReviewDTO,
  OrganizationsDTO,
} from '../types/OrganizationTypes';
import {OrganizationHelper} from '../helpers/OrganizationHelper';
import {CreatetFormModel} from '../form/CreateForm';
import {Message} from '../../auth/models/Message';
import {FavoriteOrganization} from '../models/FavoriteOrganization';
import {SuccessOrganization} from '../models/SuccessOrganization';
import {SuccessSubRelease} from '../models/SuccessSubRelease';
import {FinanceDTO} from '../../admin/types/AdminTypes';
import {Banner} from '../models/Banner';

export class OrganizationsService extends AbstractServiceRepository {
  api: ApiOrganizationsService;

  constructor() {
    super();
    this.api = new ApiOrganizationsService();
  }

  getBanners = async (city: string) => {
    const {data} = await this.api.getBanners(city);

    return this.createList<Banner>(Banner, data);
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

  createPromotion = async (dto: CreatePromotionDTO) => {
    const {data} = await this.api.createPromotion(dto);

    return this.create<Message>(Message, data);
  };

  updatePromotion = async (dto: CreatePromotionDTO) => {
    const {data} = await this.api.updatePromotion(dto);

    return this.create<Message>(Message, data);
  };

  deletePromotion = async (id: string) => {
    const {data} = await this.api.deletePromotion(id);

    return this.create<Message>(Message, data);
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

  createUpdateOrganization = async (
    createForm: CreatetFormModel,
    isEdit?: boolean,
  ) => {
    const dto = await OrganizationHelper.createOrganizationDto(createForm);

    if (isEdit) {
      const {data} = await this.api.updateOrganization(dto);

      return this.create<Message>(Message, data);
    }

    const {data} = await this.api.createOrganization(dto);

    return this.create<SuccessOrganization>(SuccessOrganization, data);
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

  checkSubStore = async () => {
    const {data} = await this.api.checkSubStore();

    return this.create<SuccessSubRelease>(SuccessSubRelease, data);
  };

  getSubInfo = async () => {
    const {data} = await this.api.getSubInfo();

    return (data as any).subdetails as FinanceDTO;
  };

  getSubscribe = async (type: string, id: string) => {
    const {data} = await this.api.getSubscribe(type, id);

    return data as any as {data: string};
  };

  approveSubscribe = async (id: string) => {
    const {data} = await this.api.approveSubscribe(id);

    return this.create<Message>(Message, data);
  };
}

export const organizationService = new OrganizationsService();
