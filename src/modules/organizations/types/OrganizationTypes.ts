import {Service} from './../models/Service';
import {PersonalOrganizations} from './../models/PersonalOrganizations';
import {OrganizationFilter} from './../models/OrganizationFilter';
import {FiltertFormModel} from '../form/FilterForm';
import {Category} from '../models/Category';
import {Nullable} from '../../../settings/types/BaseTypes';
import {SearchServices} from '../models/SearchServices';
import {OrganizationList} from '../models/OrganizationList';
import {CurrentOrganization} from '../models/CurrentOrganization';
import {PromotionList} from '../models/PromotionList';
import {CreatedStatus} from '../models/CreatedStatus';
import {CreatetFormModel} from '../form/CreateForm';
import {Review} from '../models/Review';
import {FavoriteOrganization} from '../models/FavoriteOrganization';
import {FinanceDTO} from '../../admin/types/AdminTypes';
import {Banner} from '../models/Banner';
import {Contacts} from '../models/Contacts';

export type SortFilterType = 'ratingASC' | 'ratingDESC';

export interface OrganizationsStateModel {
  categories: Category[];
  services: Service[];
  banners: Banner[];

  filterForm: FiltertFormModel;
  createForm: CreatetFormModel;

  subInfo: Nullable<FinanceDTO>;

  organizationFilter: Nullable<OrganizationFilter>;
  searchServices: SearchServices[];
  organizationList: OrganizationList[];
  promotionsList: PromotionList[];
  favoritesList: FavoriteOrganization[];
  personalOrganizations: PersonalOrganizations[];
  reviews: Review[];

  createdStatus: Nullable<CreatedStatus>;

  contacts: Nullable<Contacts>;

  isOrganizationFilter: boolean;
  isBannersLoad: boolean;
  isCategoriesLoad: boolean;
  isSearchLoad: boolean;
  isOrganizationListLoad: boolean;
  isCurrentOrganizationLoad: boolean;
  isPromotionListLoad: boolean;
  isFavoritesListLoad: boolean;
  isPersonalOrganizationsLoad: boolean;
  isCreatedStatusLoad: boolean;
  isReviewsLoad: boolean;

  currentOrganization: Nullable<CurrentOrganization>;

  checkRelease: boolean;
}

export interface UnitsFilter {
  _id: string;
  title: string;
}

export interface ContactInfoModel {
  mainPhone: string;
  whatsApp: string;
}

export interface EmployeerModel {
  _id?: string;
  position: string;
  name: string;
  phone: string;
}

export interface ScheduleModel {
  title: string;
  from?: string;
  to?: string;
  isAllDay?: boolean;
}

export interface OrganizationsDTO {
  city: string;
  categoryId: string;
  servicesId?: string[];
  brandsCarsId?: string[];
  sortType?: 'ratingASC' | 'ratingDESC';
  scheduleFilter?: ScheduleFilterDTO;
}

export interface ScheduleFilterDTO {
  isAllDay?: boolean;
  isNowWork?: boolean;
  Days?: string[];
}

export interface CreateOrganizationDTO {
  id?: string;
  name: string;
  city: string;
  address: string;
  categoryId: string;
  description: string;
  logo?: string;
  mainPhone?: string;
  whatsApp?: string;
  typeServices?: string[];
  brandsCars?: string[];
  photos?: string[];
  employeers?: EmployeerModel[];
  schedule?: ScheduleModel[];
}

export interface CreateReviewDTO {
  date: string;
  rating: number;
  comment: string;
}

export interface SubscribeDTO {
  type: string;
  id: string;
}

export interface CreatePromotionDTO {
  id: string;
  description: string;
  startPromo: string;
  endPromo: string;
}

export interface GetPromotionDTO {
  city: string;
  categoryId: string;
}

export interface CreateServiceDTO {
  category_id: string;
  title: string;
}

export interface UpdateServiceDTO {
  serviceId: string;
  title: string;
}

export interface CreateExtServieDTO {
  service_id: string;
  title: string;
}

export interface ApproveSubscribeDTO {
  id: string;
  type: string;
}

export interface ReportDTO {
  id: string;
  comment: string;
}
