import {Promotion} from './Promotion';
import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
import {Nullable} from '../../../settings/types/BaseTypes';
import {OrganizationList} from './OrganizationList';

export class PromotionList extends AbstractModel {
  organization: Nullable<OrganizationList> = null;
  promotion: Nullable<Promotion> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
