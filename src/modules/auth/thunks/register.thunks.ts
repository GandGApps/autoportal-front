import {createAsyncThunk} from '@reduxjs/toolkit';
import {authService} from '../services/auth.service';
import {RootState} from '../../../settings/redux/store';
import {getCode} from './getCode.thunks';

export const registerAuth = createAsyncThunk(
  'auth/register',
  async (_, {getState, dispatch}) => {
    const {registerForm} = (getState() as RootState).authSlice;

    const register = await authService.registerAuth(registerForm);

    if (register.message) {
      await dispatch(getCode());
    }
  },
);
