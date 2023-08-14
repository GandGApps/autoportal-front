import {OrganizationsService} from './services/OrganizationsService';
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {OrganizationsStateModel} from './types/OrganizationTypes';
import {RootState} from '../../settings/redux/store';
import {DefaultFilterForm, FilterFormProps} from './form/FilterForm';

const organizationService = new OrganizationsService();

const initialState: OrganizationsStateModel = {
  banners: [],
  categories: [],
  filterForm: DefaultFilterForm,
  organizationFilter: null,
};

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    filterChangeForm: (state, action: PayloadAction<FilterFormProps>) => {
      state.filterForm = {
        ...state.filterForm,
        [action.payload.key]: action.payload.value,
      };
    },

    setDefaultFilter: () => {},
  },
  extraReducers: builder => {
    builder.addCase(getOrganizationFilter.fulfilled, (state, action) => {
      state.organizationFilter = action.payload;
    });
  },
});

export const getCategories = createAsyncThunk(
  'organizations/categories',
  async (city: string) => {
    const categories = await organizationService.getCategories(city);

    return categories;
  },
);

export const getOrganizationFilter = createAsyncThunk(
  'organizations/filter',
  async (categoryId: string) => {
    const organizationFilter = await organizationService.getOrganizationFilter(
      categoryId,
    );

    return organizationFilter;
  },
);

export const selectOrganizationsValues = (state: RootState) =>
  state.organizationsSlice;

export const {filterChangeForm} = organizationsSlice.actions;

export default organizationsSlice.reducer;
