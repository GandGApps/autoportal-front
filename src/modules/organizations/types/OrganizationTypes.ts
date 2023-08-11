import {File} from '../../files/models/File';
import {Category} from '../models/Category';

export interface OrganizationsStateModel {
  categories: Category[];
  banners: File[];
}
