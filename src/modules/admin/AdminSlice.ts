import {createSlice} from '@reduxjs/toolkit';
import {AdminStateModal} from './types/AdminTypes';
import {RootState} from '../../settings/redux/store';
import {getUsers} from './thunks/getUsers.thunk';
import {getUserOrganizations} from './thunks/getUserOrganizations';

const initialState: AdminStateModal = {
  dealers: [],
  userOrganization: [],
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

    // USER ORGANIZATIONS
    builder.addCase(getUserOrganizations.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }

      state.userOrganization = action.payload;
    });
  },
});

export const selectAdminValues = (state: RootState) => state.adminSlice;

export default adminSlice.reducer;
