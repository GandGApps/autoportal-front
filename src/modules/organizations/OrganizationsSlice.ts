import {createSlice} from '@reduxjs/toolkit';
import {OrganizationsStateModel} from './types/OrganizationTypes';
import {RootState} from '../../settings/redux/store';

const initialState: OrganizationsStateModel = {
  banners: [],
  categories: [],
};

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {},
  extraReducers: builder => {},
});

export const selectOrganizationsValues = (state: RootState) =>
  state.organizationsSlice;

export default organizationsSlice.reducer;
