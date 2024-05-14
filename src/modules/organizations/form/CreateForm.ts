import {EmployeerModel} from './../types/OrganizationTypes';
import {Nullable} from '../../../settings/types/BaseTypes';
import {FileModel} from '../../files/models/File';
import {Category} from '../models/Category';
import {ScheduleModel} from '../types/OrganizationTypes';
import { TypeService } from '../models/TypeService';

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
  _services: TypeService[];
  brandCar: string[];
  schedule: ScheduleModel[];
  noBrands?: boolean;
  noService?: boolean;
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
  const words = [
    'Помощь на дороге',
    'Автошколы и инструкторы',
    'Аварийный комиссар',
    'Автоподбор',
    'Детейлинг',
    'Шиномонтаж',
  ];
  const brandCar = words.includes(form?.category?.title || '')
    ? form.category?.noBrands
    : !form.category?.noBrands && form.brandCar.length > 0;

  const service = !form.category?.noService || !form.typeService.length;

  return (
    form.name.length > 0 &&
    form.city.length > 0 &&
    form.description.length > 0 &&
    form.address.length > 0 &&
    form.schedule.length > 0 &&
    brandCar &&
    service &&
    form.category !== null
  );
};
