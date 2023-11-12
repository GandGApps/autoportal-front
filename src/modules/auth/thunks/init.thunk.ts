import {createAsyncThunk} from '@reduxjs/toolkit';
import {tokenService} from '../services/token/token.fabric';
import {setIsAdmin, setIsAuth} from '../AuthSlice';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {guestAuth} from './guest.thunks';
import {getUserInfo} from '../../user/_thunks';
import {
  createChangeForm,
  filterChangeForm,
} from '../../organizations/OrganizationsSlice';
import {getContacts, getCreatedStatus} from '../../organizations/_thunks';
import {adminLocalService} from '../services/admin/admin.fabric';
import {cityLocalService} from '../services/city/admin.fabric';

export const initApp = createAsyncThunk('auth/init', async (_, {dispatch}) => {
  const token = await tokenService.getTokenData();
  const adminStatus = await adminLocalService.getAdminStatus();

  await dispatch(initCity());

  if (adminStatus) {
    adminLocalService.setAdminStatus(adminStatus);
    dispatch(setIsAdmin(adminStatus));
  }

  if (token) {
    tokenService.setAccessToken(token);
    dispatch(setIsAuth(true));

    await dispatch(getUserInfo());

    await dispatch(getCreatedStatus());

    Navigation.replace(Screens.CATEGORIES);

    return;
  }

  await dispatch(guestAuth());

  Navigation.replace(Screens.WELCOME);
});

const initCity = createAsyncThunk('auth/init/city', async (_, {dispatch}) => {
  const city = await cityLocalService.getCity();

  dispatch(filterChangeForm({key: 'city', value: city || 'Москва'}));
  dispatch(createChangeForm({key: 'city', value: city || 'Москва'}));
});
