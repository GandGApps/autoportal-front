import AbstractServiceRepository from '../../../../settings/abstrcations/repositories/AbstractServiceRepository';
import {Nullable} from '../../../../settings/types/BaseTypes';
import CityLocal from './city.local';

class CityLocalService extends AbstractServiceRepository {
  private cityLocal: CityLocal;
  constructor() {
    super();
    this.cityLocal = new CityLocal();
  }

  getCity = async (): Promise<Nullable<string>> => {
    const city = await this.cityLocal.get();

    return city as Nullable<string>;
  };

  setCity = (city: string) => {
    this.cityLocal.set(city);
  };

  deleteCity = () => {
    this.cityLocal.removeAll();
  };
}

export const cityLocalService = new CityLocalService();
