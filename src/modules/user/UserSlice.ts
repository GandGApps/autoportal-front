import {
  DefaultEditForm,
  EditFormKeys,
  EditFormModel,
  EditFormProps,
} from './form/UserEditForm';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {UserStateModel} from './types/UserTypes';
import {getUserInfo} from './_thunks';
import {RootState} from '../../settings/redux/store';

const initialState: UserStateModel = {
  userInfo: null,
  editForm: DefaultEditForm,

  isUserInfoLoad: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeEditForm: (state, action: PayloadAction<EditFormProps>) => {
      state.editForm = {
        ...state.editForm,
        [`${action.payload.key}`]: action.payload.value,
      };
    },
    setDefaultEditForm: (state, action: PayloadAction<EditFormModel>) => {
      state.editForm = action.payload;
    },

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

export const {changeEditForm, setDefaultEditForm, setIsUserInfoLoad} =
  userSlice.actions;

export const selectUserValues = (state: RootState) => state.userSlice;

export default userSlice.reducer;
