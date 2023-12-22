import {EmployeerModel} from './../types/OrganizationTypes';
import {Nullable} from '../../../settings/types/BaseTypes';
import {FileModel} from '../../files/models/File';
import {Category} from '../models/Category';
import {ScheduleModel} from '../types/OrganizationTypes';

export type CreateFormKeys =
  | 'city'
  | 'category'
  | 'typeService'
  | 'brandCar'
  | 'schedule'
  | 'name'
  | 'address'
  | 'mainPhone'
  | 'whatsApp'
  | 'employeers'
  | 'description'
  | 'logo'
  | 'photos';

export interface CreatetFormModel {
  id?: string;
  city: string;
  category: Nullable<Category>;
  typeService: string[];
  brandCar: string[];
  schedule: ScheduleModel[];
  noBrands?: boolean;
  name: string;
  address: string;
  mainPhone: string;
  whatsApp: string;
  employeers: EmployeerModel[];
  description: string;
  logo: string;
  photos: string[];
}

export type CreateFormValue =
  | string
  | Category
  | string[]
  | FileModel[]
  | FileModel
  | ScheduleModel[]
  | EmployeerModel[]
  | null;

export interface CreateFormProps {
  key: CreateFormKeys;
  value: CreateFormValue;
}

export const DefaultCreateForm: CreatetFormModel = {
  city: '',
  category: null,
  typeService: [],
  brandCar: [],
  schedule: [],
  name: '',
  address: '',
  mainPhone: '',
  whatsApp: '',
  employeers: [],
  description: '',
  logo: '',
  photos: [],
};

export const isFormValidation = (form: CreatetFormModel) => {
  return (
    form.name.length > 0 &&
    form.city.length > 0 &&
    form.description.length > 0 &&
    form.address.length > 0 &&
    form.category !== null
  );
};
