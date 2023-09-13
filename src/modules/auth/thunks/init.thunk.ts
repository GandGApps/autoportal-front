import {createAsyncThunk} from '@reduxjs/toolkit';
import {tokenService} from '../services/token/token.fabric';
import {setIsAuth} from '../AuthSlice';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {guestAuth} from './guest.thunks';

export const initApp = createAsyncThunk('auth/init', async (_, {dispatch}) => {
  const token = await tokenService.getTokenData();

  if (token) {
    tokenService.setAccessToken(token);
    dispatch(setIsAuth(true));

    Navigation.replace(Screens.CATEGORIES);
    return;
  }

  await dispatch(guestAuth());

  Navigation.replace(Screens.WELCOME);
});
