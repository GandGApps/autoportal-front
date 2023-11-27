import {UnitsFilter} from './../types/OrganizationTypes';
import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
import {Nullable} from '../../../settings/types/BaseTypes';
import {TypeService} from './TypeService';

export class OrganizationFilter extends AbstractModel {
  titleTypeService?: Nullable<string> = null;
  typeService: Nullable<TypeService[]> = null;
  brandCar: Nullable<UnitsFilter[]> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
