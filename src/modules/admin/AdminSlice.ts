import {createSlice} from '@reduxjs/toolkit';
import {AdminStateModal} from './types/AdminTypes';
import {RootState} from '../../settings/redux/store';
import {getUsers} from './thunks/getUsers.thunk';

const initialState: AdminStateModal = {
  dealers: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // USERS
    builder.addCase(getUsers.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }

      state.dealers = action.payload;
    });
  },
});

export const selectAdminValues = (state: RootState) => state.adminSlice;

export default adminSlice.reducer;
