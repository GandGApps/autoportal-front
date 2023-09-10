import {LocalStorageClient} from '../client.local';
import {EncryptedLocalStorageClient} from '../encrypted.local';
import {ILocalClient, LocalClientTypes} from '../types/types';

export abstract class AbstractLocalRepository {
  localClient!: ILocalClient;

  public static clients = {
    [LocalClientTypes.localStorage]: new LocalStorageClient(),
    [LocalClientTypes.encryptedLocalStorage]: new EncryptedLocalStorageClient(),
  };

  constructor(localClientType = LocalClientTypes.localStorage) {
    this.setLocalClient(AbstractLocalRepository.clients[localClientType]);
  }

  setLocalClient = (localClient: ILocalClient) => {
    this.localClient = localClient;
  };

  abstract tableName(): string;

  get = async () => {
    return await this.localClient.get(this.tableName());
  };

  set = async (data: any) => {
    return await this.localClient.set(this.tableName(), data);
  };

  update = async (data: any) => {
    return await this.localClient.update(this.tableName(), data);
  };

  removeAll = async () => {
    return await this.localClient.removeAll(this.tableName());
  };
}
