import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
import {Nullable} from '../../../settings/types/BaseTypes';
import {OrganizationList} from './OrganizationList';

export class FavoriteOrganization extends AbstractModel {
  _id: string = '';
  client_id: string = '';
  organisation_id: Nullable<OrganizationList> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
