import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
import {Nullable} from '../../../settings/types/BaseTypes';

export class PersonalOrganizations extends AbstractModel {
  _id: string = '';
  logo: string = '';
  name: string = '';
  address: string = '';
  categoryName: string = '';
  rating: Nullable<number> = null;
  countReviews: Nullable<number> = null;

  isSubscribe: boolean = false;
  countSelect: number = 0;
  countFavorites: number = 0;
  isBaned: boolean = false;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
