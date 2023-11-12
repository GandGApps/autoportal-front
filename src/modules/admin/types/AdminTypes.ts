import {OrganizationList} from '../../organizations/models/OrganizationList';
import {Dealer} from '../models/Dealer';

export interface AdminStateModal {
  dealers: Dealer[];
  userOrganization: OrganizationList[];
}

export interface DealerInfo {
  subscription_until: null;
  free_period: boolean;
  period_updated: boolean;
  _id: string;
  phone_number: string;
  code: string;
  subscription_status: boolean;
  is_banned: boolean;
  city: string;
  full_name: string;
}

export interface FinanceDTO {
  month_amount: number;
  year_amount: number;
  free_period: number;
  percentage: number;
}

export interface CreateBannerDTO {
  title: string;
  organisation_id: string;
  from: string;
  to: string;
  image: string;
  city: string;
}
