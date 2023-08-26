import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {UserStateModel} from './types/UserTypes';
import {getUserInfo} from './_thunks';
import {RootState} from '../../settings/redux/store';

const initialState: UserStateModel = {
  userInfo: null,

  isUserInfoLoad: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsUserInfoLoad: (state, action: PayloadAction<boolean>) => {
      state.isUserInfoLoad = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }

      state.userInfo = action.payload;
    });
  },
});

export const {setIsUserInfoLoad} = userSlice.actions;

export const selectUserValues = (state: RootState) => state.userSlice;

export default userSlice.reducer;
