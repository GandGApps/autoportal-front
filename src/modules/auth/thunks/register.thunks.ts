import {createAsyncThunk} from '@reduxjs/toolkit';
import {authService} from '../services/auth.service';
import {RootState} from '../../../settings/redux/store';

export const registerAuth = createAsyncThunk(
  'auth/register',
  async (_, {getState}) => {
    const {registerForm} = (getState() as RootState).authSlice;

    return authService.registerAuth(registerForm);
  },
);
