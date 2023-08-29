import {Promotion} from './../../modules/organizations/models/Promotion';
import {RouteProp} from '@react-navigation/native';

export type RouteParams = {
  ORGANIZATION: {
    _id: string;
  };
  ORGANIZATION_EDIT: {
    _id: string;
  };
  ORGANIZATION_PROMO: {
    promo?: Promotion;
    logo?: string;
    name: string;
  };
};

export type OrganizationParams = RouteProp<RouteParams, 'ORGANIZATION'>;

export type OrganizationPromoParams = RouteProp<
  RouteParams,
  'ORGANIZATION_PROMO'
>;

export type OrganizationEditParams = RouteProp<
  RouteParams,
  'ORGANIZATION_EDIT'
>;
