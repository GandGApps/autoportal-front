import {DefaultRegisterForm, RegisterFormProps} from './form/RegisterForm';
import {DefaultLoginForm, LoginFormProps} from './form/LoginForm';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../settings/redux/store';
import {AuthStateModel} from './types/types';

const initialState: AuthStateModel = {
  loginForm: DefaultLoginForm,
  registerForm: DefaultRegisterForm,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeLoginForm: (state, action: PayloadAction<LoginFormProps>) => {
      state.loginForm = {...state.loginForm, [action.type]: action.payload};
    },

    changeRegisterForm: (state, action: PayloadAction<RegisterFormProps>) => {
      state.registerForm = {
        ...state.registerForm,
        [action.type]: action.payload,
      };
    },
  },
});

export const {} = authSlice.actions;

export const selectAuthValues = (state: RootState) => state.authSlice;

export default authSlice.reducer;
