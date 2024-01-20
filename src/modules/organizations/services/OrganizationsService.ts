import {ReportDTO, UpdateServiceDTO} from './../types/OrganizationTypes';
import {ServiceExt} from './../models/ServiceExt';
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
  CreateExtServieDTO,
  CreatePromotionDTO,
  CreateReviewDTO,
  CreateServiceDTO,
  GetPromotionDTO,
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
import {GetService, Service} from '../models/Service';
import {Contacts} from '../models/Contacts';
import {tokenService} from '../../auth/services/token/token.fabric';

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

  getServices = async (categoryId: string) => {
    const {data} = await this.api.getServices(categoryId);

    return this.createList<GetService>(Service, data);
  };

  createService = async (dto: CreateServiceDTO) => {
    const {data} = await this.api.createService(dto);

    return this.create<Message>(Message, data);
  };

  updateService = async (dto: UpdateServiceDTO) => {
    const {data} = await this.api.updateService(dto);

    return this.create<Message>(Message, data);
  };
  deleteService = async (serviceId: string) => {
    const {data} = await this.api.deleteService(serviceId);

    return this.create<Message>(Message, data);
  };

  getExtServices = async (serviceId: string) => {
    const {data} = await this.api.getExtServices(serviceId);

    return this.createList<ServiceExt>(ServiceExt, (data as any).extservice);
  };

  createExtService = async (dto: CreateExtServieDTO) => {
    const {data} = await this.api.createExtService(dto);

    return this.create<Message>(Message, data);
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
    const formatted = OrganizationHelper.formattedScheduleDTO(
      form.schedule || [],
    );

    const scheduleFilter = formatted ? {scheduleFilter: formatted} : {};

    let dto: OrganizationsDTO = {
      city: form.city,
      categoryId: form.category?._id!,
      ...scheduleFilter,
    };

    if (form.sort) {
      dto = {...dto, sortType: form.sort};
    }

    if (form.typeService?.length) {
      dto = {...dto, servicesId: form.typeService};
    }

    if (form.brandCar?.length) {
      dto = {...dto, brandsCarsId: form.brandCar};
    }
    try {
      const response = await this.api.getOrganizationList(dto);
      const { data, status } = response;
    

      return this.createList<OrganizationList>(OrganizationList, data);

      
    } catch (error) {
      console.error('Произошла ошибка при запросе:', error);
    }
    
  };
  
  getCurrentOrganization = async (_id: string) => {
    const {data} = await this.api.getCurrentOrganization(_id);

    return this.create<CurrentOrganization>(
      CurrentOrganization,
      (data as any).organisation,
    );
  };

  deleteOrganization = async (id: string) => {
    try {
      const currentToken = await tokenService.getTokenData();
      if (!currentToken) {
        console.log('Отсутствует токен аутентификации');
        throw new Error('Отсутствует токен аутентификации.');
      }
      console.log(' токен аутентификации', currentToken);

      tokenService.setAccessToken(currentToken);
      const {data} = await this.api.deleteOrganization(id);

      return this.create<Message>(Message, data);
    } catch (error) {
      console.log('ошибка при удалении орги', error);
      throw error; 
    }
  };

  getPromotionsList = async (dto: GetPromotionDTO) => {
    const {data} = await this.api.getPromotionsList(dto);

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
    try {
      const currentToken = await tokenService.getTokenData();
      // Убедитесь, что у вас есть токен перед выполнением запроса
      if (!currentToken) {
        ('Отсутствует токен аутентификации');
        throw new Error('Отсутствует токен аутентификации.');
      }
      console.log(' токен аутентификации', currentToken);

      // Устанавливаем токен в API-клиент
      tokenService.setAccessToken(currentToken);
      // Отправка запроса на удаление акции
      const {data} = await this.api.deletePromotion(id);

      // Успешное удаление, можно вернуть данные
      return this.create<Message>(Message, data);
    } catch (error) {
      throw error; // Пробросьте ошибку дальше для обработки в вызывающем коде
    }
  };
  getFavoritesList = async (categoryId: string) => {
    const {data} = await this.api.getFavoritesList(categoryId);

    return this.createList<FavoriteOrganization>(FavoriteOrganization, data);
  };
  getFavoritesAllList = async () => {
    const {data} = await this.api.getFavoritesAllList();

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

  approveSubscribe = async (id: string, type: string) => {
    const {data} = await this.api.approveSubscribe(id, type);

    return this.create<Message>(Message, data);
  };

  deactivateSubscribe = async (id: string) => {
    const {data} = await this.api.deactivateSubscribe(id);

    return this.create<Message>(Message, data);
  };

  sendReport = async (dto: ReportDTO) => {
    const {data} = await this.api.sendReport(dto);

    return this.create<Message>(Message, data);
  };

  resumeSubscribe = async (id: string) => {
    return await this.api.resumeSubscribe(id);
  };

  removeService = async (id: string) => {
    return this.api.removeService(id);
  };

  getContacts = async () => {
    const {data} = await this.api.getContacts();

    return this.create<Contacts>(Contacts, data);
  };

  getPolicy = async () => {
    const {data} = await this.api.getPolicy();

    return data as any as string;
  };

  getOffer = async () => {
    const {data} = await this.api.getOffer();

    return data as any as string;
  };
}

export const organizationService = new OrganizationsService();

