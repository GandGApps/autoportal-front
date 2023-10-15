import AbstractApiRepository from '../../../settings/abstrcations/repositories/AbstractApiRepository';
import {Endpoints} from '../../../template/api/Endpoints';
import {FinanceDTO} from '../types/AdminTypes';

export class AdminApiService extends AbstractApiRepository {
  getUsers = (city: string) => {
    return this.apiClient.get({
      url: Endpoints.getUsers(city),
    });
  };

  changeFinanceSettings = (dto: FinanceDTO) => {
    return this.apiClient.post({
      url: Endpoints.finance,
      data: dto,
    });
  };
}
