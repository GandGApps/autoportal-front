import {Dealer} from '../models/Dealer';

export interface AdminStateModal {
  dealers: Dealer[];
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
}
