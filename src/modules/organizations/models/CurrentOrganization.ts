import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
import {Nullable} from '../../../settings/types/BaseTypes';
import {
  EmployeerModel,
  ScheduleModel,
  UnitsFilter,
} from '../types/OrganizationTypes';
import {Category} from './Category';
import {Promotion} from './Promotion';
import {Review} from './Review';
import {TypeService} from './TypeService';

export class CurrentOrganization extends AbstractModel {
  _id: string = '';
  logo: string = '';
  name: string = '';
  address: string = '';
  categoryId: Nullable<Category> = null;
  rating: Nullable<number> = null;
  countReviews: Nullable<number> = null;

  isFavorite: boolean = false;
  description: string = '';
  city: string = '';
  photos: string[] = [];
  promo: Nullable<Promotion> = null;
  mainPhone: string = '';
  whatsApp: string = '';
  employeers: EmployeerModel[] = [];
  services: TypeService[] = [];
  brandsCars: UnitsFilter[] = [];
  schedule: ScheduleModel[] = [];
  lastReview: Nullable<Review> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
