import {PersonalOrganizations} from './../models/PersonalOrganizations';
import {OrganizationFilter} from './../models/OrganizationFilter';
import {File} from '../../files/models/File';
import {FiltertFormModel} from '../form/FilterForm';
import {Category} from '../models/Category';
import {Nullable} from '../../../settings/types/BaseTypes';
import {SearchServices} from '../models/SearchServices';
import {OrganizationList} from '../models/OrganizationList';
import {CurrentOrganization} from '../models/CurrentOrganization';
import {Promotion} from '../models/Promotion';
import {PromotionList} from '../models/PromotionList';
import {CreatedStatus} from '../models/CreatedStatus';

export type SortFilterType = 'ratingASC' | 'ratingDESC';

export interface OrganizationsStateModel {
  categories: Category[];
  banners: File[];

  filterForm: FiltertFormModel;

  organizationFilter: Nullable<OrganizationFilter>;
  searchServices: SearchServices[];
  organizationList: OrganizationList[];
  promotionsList: PromotionList[];
  favoritesList: OrganizationList[];
  personalOrganizations: PersonalOrganizations[];
  createdStatus: Nullable<CreatedStatus>;

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

  currentOrganization: Nullable<CurrentOrganization>;
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
  _id: string;
  position: string;
  name: string;
  phone: string;
}

export interface ScheduleModel {
  title: string;
  to?: string;
  do?: string;
  isAllDay?: boolean;
}
