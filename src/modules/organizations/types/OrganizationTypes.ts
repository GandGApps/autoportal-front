import {OrganizationFilter} from './../models/OrganizationFilter';
import {File} from '../../files/models/File';
import {FiltertFormModel} from '../form/FilterForm';
import {Category} from '../models/Category';
import {Nullable} from '../../../settings/types/BaseTypes';
import {SearchServices} from '../models/SearchServices';
import {OrganizationList} from '../models/OrganizationList';

export interface OrganizationsStateModel {
  categories: Category[];
  banners: File[];
  filterForm: FiltertFormModel;
  organizationFilter: Nullable<OrganizationFilter>;
  searchServices: SearchServices[];
  organizationList: OrganizationList[];

  isOrganizationFilter: boolean;
  isBannersLoad: boolean;
  isCategoriesLoad: boolean;
  isSearchLoad: boolean;
  isOrganizationListLoad: boolean;
}

export interface UnitsFilter {
  _id: string;
  title: string;
}

export type SortFilterType = 'ratingASC' | 'ratingDESC';
