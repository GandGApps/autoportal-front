import {Screens} from '../../../routes/models/Screens';
import Navigation from '../../../routes/navigation/Navigation';
import {RootState} from '../../../settings/redux/store';
import {setIsAuth} from '../AuthSlice';
import {tokenService} from '../services/token/token.fabric';
import {authService} from './../services/auth.service';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const loginAuth = createAsyncThunk(
  'auth/login',
  async (_, {getState, dispatch}) => {
    const {loginForm} = (getState() as RootState).authSlice;
    const userAuth = await authService.login(loginForm);

    if (userAuth.token) {
      tokenService.setAccessToken(userAuth.token);
      tokenService.setTokenData(userAuth.token);

      dispatch(setIsAuth(true));

      Navigation.replace(Screens.INIT);
    }
  },
);
