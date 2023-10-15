import {MaskHelper} from './../../../helper/MaskHelper';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {authService} from '../services/auth.service';
import {RootState} from '../../../settings/redux/store';
import {AdminDTO} from '../types/types';
import {tokenService} from '../services/token/token.fabric';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {resetAuthForms, setIsAdmin} from '../AuthSlice';
import {adminLocalService} from '../services/admin/admin.fabric';

export const adminLogin = createAsyncThunk(
  'auth/admin/login',
  async (password: string, {getState, dispatch}) => {
    const {loginForm} = (getState() as RootState).authSlice;

    const dto: AdminDTO = {
      phone: MaskHelper.clearFormat(loginForm.phone_number),
      password: password,
    };

    const data = await authService.adminLogin(dto);

    if (data.token) {
      tokenService.setTokenData(data.token);
      tokenService.setAccessToken(data.token);
      tokenService.setAccessToken(data.token);
      adminLocalService.setAdminStatus(true);

      dispatch(resetAuthForms());

      dispatch(setIsAdmin(true));

      Navigation.replace(Screens.INIT);
    }
  },
);
