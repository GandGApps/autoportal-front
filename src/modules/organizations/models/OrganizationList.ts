import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
import {Nullable} from '../../../settings/types/BaseTypes';

export class OrganizationList extends AbstractModel {
  _id: string = '';
  logo: string = '';
  name: string = '';
  address: string = '';
  categoryName: string = '';
  rating: Nullable<number> = null;
  countReviews: Nullable<number> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
