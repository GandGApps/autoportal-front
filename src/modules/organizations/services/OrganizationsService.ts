import AbstractServiceRepository from '../../../settings/abstrcations/repositories/AbstractServiceRepository';
import {ApiOrganizationsService} from './ApiOrganizationsService';

export class OrganizationsService extends AbstractServiceRepository {
  api: ApiOrganizationsService;

  constructor() {
    super();
    this.api = new ApiOrganizationsService();
  }

  getCategories = () => {};
}
