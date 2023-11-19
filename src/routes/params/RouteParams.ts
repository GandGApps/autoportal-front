import {Banner} from '../../modules/organizations/models/Banner';
import {Service} from '../../modules/organizations/models/Service';
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
    organizationId: string;
  };
  SUB_ORGANIZATION: {
    organizationId: string;
  };
  SUBSCRIBE_MODAL: {
    url: string;
    organizationId: string;
    type: 'month' | 'year';
  };
  ADMIN_USER_ORGS: {
    id: string;
  };
  ADMIN_USERS:
    | {
        id: string;
        city?: string;
      }
    | undefined;
  ADMIN_EDIT_SERVICE: {
    service: Service;
  };
  ADMIN_CREATE_BANNER:
    | {
        banner: Banner;
      }
    | undefined;

  ADMIN_MODAL_REMOVE_SERVICE: {
    title: string;
    id: string;
    categoryId: string;
  };
  MODAL_BANNER_REMOVE: {
    bannerId: string;
  };
  MODAL_USER_BAN: {
    userId: string;
  };
  MODAL_BRANSCARS: {
    isCreate: boolean;
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

export type AdminEditServiceParams = RouteProp<
  RouteParams,
  'ADMIN_EDIT_SERVICE'
>;

export type AdminCreateBannerParams = RouteProp<
  RouteParams,
  'ADMIN_CREATE_BANNER'
>;

export type AdminBannerRemoveParams = RouteProp<
  RouteParams,
  'MODAL_BANNER_REMOVE'
>;

export type AdminServiceRemoveParams = RouteProp<
  RouteParams,
  'ADMIN_MODAL_REMOVE_SERVICE'
>;

export type AdminUsersParams = RouteProp<RouteParams, 'ADMIN_USERS'>;

export type FilterModalBrandsParams = RouteProp<RouteParams, 'MODAL_BRANSCARS'>;
