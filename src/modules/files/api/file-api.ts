import AbstractApiRepository from '../../../settings/abstrcations/repositories/AbstractApiRepository';
import {Endpoints} from '../../../template/api/Endpoints';

export class FileApi extends AbstractApiRepository {
  uploadFile = (formData: FormData) => {
    return this.apiClient.post({
      url: Endpoints.file,
      data: formData,
      config: {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    });
  };
}
