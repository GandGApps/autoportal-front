import {authService} from './../services/auth.service';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const guestAuth = createAsyncThunk('auth/quest', async () => {
  const tokenData = await authService.questAuth();

  authService.setToken(tokenData);
});
