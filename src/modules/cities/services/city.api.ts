import AbstractApiRepository from '../../../settings/abstrcations/repositories/AbstractApiRepository';
import {Endpoints} from '../../../template/api/Endpoints';

export class CityApiService extends AbstractApiRepository {
  getCities = (query: string) => {
    return this.apiClient.post({
      url: Endpoints.cities(query),
    });
  };
}
