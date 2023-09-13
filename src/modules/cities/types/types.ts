import {City} from '../models/City';

export interface CitiesStateModel {
  cities: City[];

  isLoad: boolean;
}
