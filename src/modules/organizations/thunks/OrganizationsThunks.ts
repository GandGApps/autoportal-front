import {RootState} from './../../../settings/redux/store';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {OrganizationsService} from '../services/OrganizationsService';
import {
  setIsBannersLoad,
  setIsCategoriesLoad,
  setIsOrganizationFilter,
  setIsSearchLoad,
} from '../OrganizationsSlice';

const organizationService = new OrganizationsService();

export const getBanners = createAsyncThunk(
  'organizations/banners',
  async (_, {getState, dispatch}) => {
    const {filterForm, isBannersLoad} = (getState() as RootState)
      .organizationsSlice;

    if (isBannersLoad) {
      return null;
    }

    dispatch(setIsBannersLoad(true));

    return await organizationService.getBanners(filterForm.city).finally(() => {
      dispatch(setIsBannersLoad(false));
    });
  },
);

export const getCategories = createAsyncThunk(
  'organizations/categories',
  async (_, {getState, dispatch}) => {
    const {filterForm, isCategoriesLoad} = (getState() as RootState)
      .organizationsSlice;

    if (isCategoriesLoad) {
      return null;
    }

    dispatch(setIsCategoriesLoad(true));

    return await organizationService
      .getCategories(filterForm.city)
      .finally(() => {
        dispatch(setIsCategoriesLoad(false));
      });
  },
);

export const getSearchServices = createAsyncThunk(
  'organizations/searchServices',
  async (query: string, {getState, dispatch}) => {
    if (!query.length) {
      return [];
    }

    const {isSearchLoad} = (getState() as RootState).organizationsSlice;

    if (isSearchLoad) {
      return null;
    }

    dispatch(setIsSearchLoad(true));

    return await organizationService.getSearchServices(query).finally(() => {
      dispatch(setIsSearchLoad(false));
    });
  },
);

export const getOrganizationFilter = createAsyncThunk(
  'organizations/filter',
  async (categoryId: string, {getState, dispatch}) => {
    const {isCategoriesLoad} = (getState() as RootState).organizationsSlice;

    if (isCategoriesLoad) {
      return null;
    }

    dispatch(setIsOrganizationFilter(true));

    return await organizationService
      .getOrganizationFilter(categoryId)
      .finally(() => {
        dispatch(setIsOrganizationFilter(false));
      });
  },
);

export const getOrganizationList = createAsyncThunk(
  'organizations/list',
  async (_, {getState, dispatch}) => {
    const {isOrganizationListLoad} = (getState() as RootState)
      .organizationsSlice;

    if (isOrganizationListLoad) {
      return null;
    }

    dispatch(setIsOrganizationFilter(true));

    return await organizationService.getOrganizationList().finally(() => {
      setIsOrganizationFilter(false);
    });
  },
);
