import AbstractServiceRepository from '../../../../settings/abstrcations/repositories/AbstractServiceRepository';
import TokenLocal from './token.local';
import {TokenData} from '../../models/TokenData';
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

  getTokenData = async (): Promise<Nullable<TokenData>> => {
    const tokenData = await this.tokenLocal.get();

    if (!tokenData) {
      return null;
    }

    return this.create<TokenData>(TokenData, tokenData);
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
