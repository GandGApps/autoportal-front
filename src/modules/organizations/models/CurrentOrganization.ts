import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
import {Nullable} from '../../../settings/types/BaseTypes';
import {
  ContactInfoModel,
  EmployeerModel,
  ScheduleModel,
  UnitsFilter,
} from '../types/OrganizationTypes';
import {Promotion} from './Promotion';
import {TypeService} from './TypeService';

export class CurrentOrganization extends AbstractModel {
  _id: string = '';
  logo: string = '';
  name: string = '';
  address: string = '';
  categoryName: string = '';
  rating: Nullable<number> = null;
  countReviews: Nullable<number> = null;

  isFavorite: boolean = false;
  city: string = '';
  previews: string[] = [];
  promotion: Nullable<Promotion> = null;
  contactInfo: Nullable<ContactInfoModel> = null;
  employeers: EmployeerModel[] = [];
  services: TypeService[] = [];
  brandsCars: UnitsFilter[] = [];
  schedule: ScheduleModel[] = [];

  constructor(props: any) {
    super();
    this.load(props);
  }
}
