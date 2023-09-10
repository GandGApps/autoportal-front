import EncryptedStorage from 'react-native-encrypted-storage';
import {LocalStorageClient} from './client.local';

export class EncryptedLocalStorageClient extends LocalStorageClient {
  get = async (tableName: string): Promise<any> => {
    const data = await EncryptedStorage.getItem(tableName);

    return data ? JSON.parse(data) : null;
  };

  set = async (tableName: string, data: any): Promise<any> => {
    EncryptedStorage.setItem(tableName, JSON.stringify(data));
  };

  removeAll = async (tableName: string): Promise<any> =>
    EncryptedStorage.removeItem(tableName);
}
