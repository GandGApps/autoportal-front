import AbstractServiceRepository from '../../../settings/abstrcations/repositories/AbstractServiceRepository';
import {City} from '../models/City';
import {CityApiService} from './city.api';

class CityService extends AbstractServiceRepository {
  api: CityApiService;

  constructor() {
    super();
    this.api = new CityApiService();
  }

  getCities = async (query: string) => {
    const {data} = await this.api.getCities(query);
    return this.createList<City>(City, data);
  };
}

export const cityService = new CityService();
