import {createAsyncThunk} from '@reduxjs/toolkit';
import {setIsAdmin, setIsAuth} from '../AuthSlice';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {tokenService} from '../services/token/token.fabric';
import {adminLocalService} from '../services/admin/admin.fabric';

export const logoutAuth = createAsyncThunk(
  'auth/logout',
  (isAdmin: boolean, {dispatch}) => {
    if (isAdmin) {
      adminLocalService.deleteAdminStatus();
    }
    tokenService.deleteToken();

    dispatch(setIsAuth(false));
    dispatch(setIsAdmin(false));

    Navigation.replace(Screens.INIT);
  },
);
