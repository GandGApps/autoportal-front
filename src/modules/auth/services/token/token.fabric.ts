import AbstractServiceRepository from '../../../../settings/abstrcations/repositories/AbstractServiceRepository';
import TokenLocal from './token.local';
import {AuthApiService} from '../auth.api';
import {Nullable} from '../../../../settings/types/BaseTypes';

class TokenService extends AbstractServiceRepository {
  private tokenLocal: TokenLocal;
  private api: AuthApiService;

  constructor() {
    super();
    this.tokenLocal = new TokenLocal();
    this.api = new AuthApiService();
  }

  getTokenData = async (): Promise<Nullable<string>> => {
    const tokenData = await this.tokenLocal.get();

    if (!tokenData) {
      return null;
    }

    return tokenData as Nullable<string>;
  };

  setTokenData = (token: string) => {
    this.tokenLocal.set(token);
  };

  setAccessToken = (token: string) => {
    this.api.setAccessToken(token);
  };

  deleteToken = () => {
    this.api.clearAccessToken();
    this.tokenLocal.removeAll();
  };
}

export const tokenService = new TokenService();
