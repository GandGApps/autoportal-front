import {Nullable} from '../../../settings/types/BaseTypes';
import {Category} from '../models/Category';
import {TypeService} from '../models/TypeService';
import {SortFilterType, UnitsFilter} from '../types/OrganizationTypes';

export type FilterFormKeys =
  | 'city'
  | 'category'
  | 'typeService'
  | 'brandCar'
  | 'sort'
  | 'schedule';

export interface FiltertFormModel {
  city: string;
  category: Nullable<Category>;
  typeService: Nullable<string[]>;
  brandCar: Nullable<string[]>;
  sort: Nullable<SortFilterType>;
  schedule: Nullable<string[]>;
}

export interface FilterFormProps {
  key: FilterFormKeys;
  value: string | Category | string[] | SortFilterType | null;
}

export const DefaultFilterForm: FiltertFormModel = {
  city: 'Москва',
  category: null,
  typeService: null,
  brandCar: null,
  sort: null,
  schedule: null,
};
