import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
import {UnitsFilter} from '../types/OrganizationTypes';

export class TypeService extends AbstractModel {
  _id: string = '';
  title: string = '';
  ext_services?: UnitsFilter[] = [];

  constructor(props: any) {
    super();
    this.load(props);
  }
}
