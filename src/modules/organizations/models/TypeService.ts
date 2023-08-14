import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
import {UnitsFilter} from '../types/OrganizationTypes';

export class TypeService extends AbstractModel {
  _id: string = '';
  title: string = '';
  subServices?: UnitsFilter[] = [];

  constructor(props: any) {
    super();
    this.load(props);
  }
}
