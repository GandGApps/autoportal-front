import {createAsyncThunk} from '@reduxjs/toolkit';
import {tokenService} from '../services/token/token.fabric';

export const initApp = createAsyncThunk(
  'auth/init',
  async (_, {getState, dispatch}) => {
    const token = await tokenService.getTokenData();
  },
);
