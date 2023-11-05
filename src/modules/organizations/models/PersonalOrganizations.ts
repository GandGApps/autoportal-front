import {Promotion} from './Promotion';
import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
import {Nullable} from '../../../settings/types/BaseTypes';
import {Category} from './Category';

export class PersonalOrganizations extends AbstractModel {
  _id: string = '';
  logo: string = '';
  name: string = '';
  address: string = '';
  categoryName: Nullable<Category> = null;
  rating: Nullable<number> = null;
  countReviews: Nullable<number> = null;

  isSubscribe: boolean = false;
  isActive: boolean = false;
  countSelect: number = 0;
  countFavorites: number = 0;
  isBaned: boolean = false;

  promo: Nullable<Promotion> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
