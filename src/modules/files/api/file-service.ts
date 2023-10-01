import AbstractServiceRepository from '../../../settings/abstrcations/repositories/AbstractServiceRepository';
import {FileModel} from '../models/File';
import {FileApi} from './file-api';

export class FileService extends AbstractServiceRepository {
  api: FileApi;

  constructor() {
    super();
    this.api = new FileApi();
  }

  uploadFile = async (file: FileModel) => {
    const formData = new FormData();
    formData.append('file', file);

    const {data: url} = await this.api.uploadFile(formData);

    return url as any;
  };
}

export const fileSevice = new FileService();
