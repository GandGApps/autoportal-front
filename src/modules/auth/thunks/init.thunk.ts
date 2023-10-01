import {createAsyncThunk} from '@reduxjs/toolkit';
import {tokenService} from '../services/token/token.fabric';
import {setIsAuth} from '../AuthSlice';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {guestAuth} from './guest.thunks';
import {getUserInfo} from '../../user/_thunks';
import {
  createChangeForm,
  filterChangeForm,
} from '../../organizations/OrganizationsSlice';
import {RootState} from '../../../settings/redux/store';
import {getCreatedStatus} from '../../organizations/_thunks';

export const initApp = createAsyncThunk('auth/init', async (_, {dispatch}) => {
  const token = await tokenService.getTokenData();

  if (token) {
    tokenService.setAccessToken(token);
    dispatch(setIsAuth(true));

    await dispatch(getUserInfo());

    await dispatch(initCity());

    await dispatch(getCreatedStatus());

    Navigation.replace(Screens.CATEGORIES);

    return;
  }

  await dispatch(guestAuth());

  Navigation.replace(Screens.WELCOME);
});

const initCity = createAsyncThunk(
  'auth/init/city',
  async (_, {getState, dispatch}) => {
    const {userInfo} = (getState() as RootState).userSlice;

    dispatch(
      filterChangeForm({key: 'city', value: userInfo?.city || 'Москва'}),
    );
    dispatch(
      createChangeForm({key: 'city', value: userInfo?.city || 'Москва'}),
    );
  },
);
