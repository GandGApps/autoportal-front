import {RouteProp} from '@react-navigation/native';

export type RouteParams = {
  ORGANIZATION: {
    _id: string;
  };
};

export type OrganizationParams = RouteProp<RouteParams, 'ORGANIZATION'>;
