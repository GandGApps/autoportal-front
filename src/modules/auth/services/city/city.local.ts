import {AbstractLocalRepository} from '../../../../settings/local-storage/abstract/abstract.local';
import {LocalClientTypes} from '../../../../settings/local-storage/types/types';

export default class CityLocal extends AbstractLocalRepository {
  constructor(localClientType = LocalClientTypes.encryptedLocalStorage) {
    super(localClientType);
    this.setLocalClient(AbstractLocalRepository.clients[localClientType]);
  }

  tableName(): string {
    return 'city';
  }
}
