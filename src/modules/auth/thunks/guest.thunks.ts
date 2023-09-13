import {tokenService} from '../services/token/token.fabric';
import {authService} from './../services/auth.service';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const guestAuth = createAsyncThunk('auth/quest', async () => {
  const tokenData = await authService.questAuth();

  tokenService.setAccessToken(tokenData);
});
