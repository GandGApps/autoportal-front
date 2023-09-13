import {DefaultRegisterForm, RegisterFormProps} from './form/RegisterForm';
import {DefaultLoginForm, LoginFormProps} from './form/LoginForm';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../settings/redux/store';
import {AuthStateModel, AuthType} from './types/types';
import {initApp} from './thunks/init.thunk';
import {guestAuth} from './thunks/guest.thunks';

const initialState: AuthStateModel = {
  loginForm: DefaultLoginForm,
  registerForm: DefaultRegisterForm,

  type: 'Вход',

  title: '',

  isAuth: false,
  isReady: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // FORM
    changeLoginForm: (state, action: PayloadAction<LoginFormProps>) => {
      state.loginForm = {
        ...state.loginForm,
        [action.payload.key]: action.payload.value,
      };
    },

    changeRegisterForm: (state, action: PayloadAction<RegisterFormProps>) => {
      state.registerForm = {
        ...state.registerForm,
        [action.payload.key]: action.payload.value,
      };
    },

    // SETTERS
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },

    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },

    setAuthType: (state, action: PayloadAction<AuthType>) => {
      state.type = action.payload;
    },
  },

  extraReducers(builder) {
    // Init App
    builder.addCase(initApp.fulfilled, (state, action) => {});

    // Guest Auth
    builder.addCase(guestAuth.fulfilled, (state, action) => {});
  },
});

export const {
  changeLoginForm,
  changeRegisterForm,
  setIsAuth,
  setTitle,
  setAuthType,
} = authSlice.actions;

export const selectAuthValues = (state: RootState) => state.authSlice;

export default authSlice.reducer;
