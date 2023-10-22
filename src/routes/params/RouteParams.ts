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
  SUB_ORGANIZATION: {
    organizationId: string;
  };
  SUBSCRIBE_MODAL: {
    url: string;
  };
  ADMIN_USER_ORGS: {
    id: string;
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

export type SubOrganizationParams = RouteProp<RouteParams, 'SUB_ORGANIZATION'>;

export type SubscribeModalParams = RouteProp<RouteParams, 'SUBSCRIBE_MODAL'>;

export type AdminUserOrgsParams = RouteProp<RouteParams, 'ADMIN_USER_ORGS'>;
