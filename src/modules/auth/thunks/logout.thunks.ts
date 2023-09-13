import {createAsyncThunk} from '@reduxjs/toolkit';
import {setIsAuth} from '../AuthSlice';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {tokenService} from '../services/token/token.fabric';

export const logoutAuth = createAsyncThunk('auth/logout', (_, {dispatch}) => {
  tokenService.deleteToken();

  dispatch(setIsAuth(false));

  Navigation.replace(Screens.INIT);
});
