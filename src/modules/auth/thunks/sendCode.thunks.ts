import {createAsyncThunk} from '@reduxjs/toolkit';
import {authService} from '../services/auth.service';
import {tokenService} from '../services/token/token.fabric';
import {setIsAuth} from '../AuthSlice';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {RootState} from '../../../settings/redux/store';

export const sendCode = createAsyncThunk(
  'auth/sendCode',
  async (code: string, {getState, dispatch}) => {
    const {type, loginForm, registerForm} = (getState() as RootState).authSlice;

    const authUser = await authService.sendCode({
      phone_number:
        type === 'Вход' ? loginForm.phone_number : registerForm.phone_number,
      confCode: code,
    });

    if (authUser.token) {
      tokenService.setAccessToken(authUser.token);
      tokenService.setTokenData(authUser.token);

      dispatch(setIsAuth(true));

      Navigation.replace(Screens.INIT);
    }
  },
);
