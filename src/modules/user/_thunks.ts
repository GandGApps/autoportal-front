import {createAsyncThunk} from '@reduxjs/toolkit';
import {UserService} from './services/UserService';
import {RootState} from '../../settings/redux/store';
import {setIsUserInfoLoad} from './UserSlice';

const userService = new UserService();

export const getUserInfo = createAsyncThunk(
  'user/info',
  async (_, {getState, dispatch}) => {
    const {isUserInfoLoad} = (getState() as RootState).userSlice;

    if (isUserInfoLoad) {
      return null;
    }

    dispatch(setIsUserInfoLoad(true));

    return await userService.getUserInfo().finally(() => {
      dispatch(setIsUserInfoLoad(false));
    });
  },
);
