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
  city: string;
  category: Nullable<Category>;
  typeService: Nullable<string[]>;
  brandCar: Nullable<string[]>;
  schedule: ScheduleModel[];
  name: string;
  address: string;
  mainPhone: string;
  whatsApp: string;
  employeers: string[];
  description: string;
  logo: Nullable<FileModel>;
  photos: FileModel[];
}

export type CreateFormValue =
  | string
  | Category
  | string[]
  | FileModel[]
  | FileModel
  | ScheduleModel[]
  | null;

export interface CreateFormProps {
  key: CreateFormKeys;
  value: CreateFormValue;
}

export const DefaultCreateForm: CreatetFormModel = {
  city: '',
  category: null,
  typeService: null,
  brandCar: null,
  schedule: [],

  name: '',
  address: '',
  mainPhone: '',
  whatsApp: '',
  employeers: [],
  description: '',
  logo: null,
  photos: [],
};
