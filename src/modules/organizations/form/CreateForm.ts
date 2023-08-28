import {Nullable} from '../../../settings/types/BaseTypes';
import {FileModel} from '../../files/models/File';
import {Category} from '../models/Category';

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
  schedule: Nullable<string[]>;
  name: string;
  address: string;
  mainPhone: string;
  whatsApp: string;
  employeers: string[];
  description: string;
  logo: string;
  photos: FileModel[];
}

export interface CreateFormProps {
  key: CreateFormKeys;
  value: string | Category | string[] | FileModel[] | null;
}

export const DefaultCreateForm: CreatetFormModel = {
  city: 'Москва',
  category: null,
  typeService: null,
  brandCar: null,
  schedule: null,

  name: '',
  address: '',
  mainPhone: '',
  whatsApp: '',
  employeers: [],
  description: '',
  logo: '',
  photos: [],
};
