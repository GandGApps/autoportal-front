import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
import {Nullable} from '../../../settings/types/BaseTypes';
import {File} from '../../files/models/File';
import {UnitsFilter} from '../types/OrganizationTypes';

export class OrganizationList extends AbstractModel {
  _id: string = '';
  logo: Nullable<File> = null;
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
