import AbstractServiceRepository from '../../../settings/abstrcations/repositories/AbstractServiceRepository';
import {AuthApiService} from './auth.api';

export class AuthService extends AbstractServiceRepository {
  api: AuthApiService;

  constructor() {
    super();
    this.api = new AuthApiService();
  }
}
