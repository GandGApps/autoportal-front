import {OrganizationFilter} from './../models/OrganizationFilter';
import {File} from '../../files/models/File';
import {FiltertFormModel} from '../form/FilterForm';
import {Category} from '../models/Category';
import {Nullable} from '../../../settings/types/BaseTypes';

export interface OrganizationsStateModel {
  categories: Category[];
  banners: File[];
  filterForm: FiltertFormModel;
  organizationFilter: Nullable<OrganizationFilter>;
}

export interface UnitsFilter {
  _id: string;
  title: string;
}

export type SortFilterType = 'ratingASC' | 'ratingDESC';
