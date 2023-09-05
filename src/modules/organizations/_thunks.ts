import {RootState} from '../../settings/redux/store';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {OrganizationsService} from './services/OrganizationsService';
import {
  setIsBannersLoad,
  setIsCategoriesLoad,
  setIsCreatedStatusLoad,
  setIsCurrentOrganizationLoad,
  setIsFavoritesListLoad,
  setIsOrganizationFilter,
  setIsPersonalOrganizationsLoad,
  setIsPromotionListLoad,
  setIsReviewsLoad,
  setIsSearchLoad,
} from './OrganizationsSlice';

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
      dispatch(setIsOrganizationFilter(false));
    });
  },
);

export const getCurrentOrganization = createAsyncThunk(
  'organization/current',
  async (_id: string, {getState, dispatch}) => {
    const {isCurrentOrganizationLoad} = (getState() as RootState)
      .organizationsSlice;

    if (isCurrentOrganizationLoad) {
      return null;
    }

    dispatch(setIsCurrentOrganizationLoad(true));

    return await organizationService.getCurrentOrganization(_id).finally(() => {
      dispatch(setIsCurrentOrganizationLoad(false));
    });
  },
);

export const getPromotionsList = createAsyncThunk(
  'organization/promotions/list',
  async (_, {getState, dispatch}) => {
    const {isPromotionListLoad} = (getState() as RootState).organizationsSlice;

    if (isPromotionListLoad) {
      return null;
    }

    dispatch(setIsPromotionListLoad(true));

    return await organizationService.getPromotionsList().finally(() => {
      dispatch(setIsPromotionListLoad(false));
    });
  },
);

export const getFavoritesList = createAsyncThunk(
  'organization/favorites/list',
  async (_, {getState, dispatch}) => {
    const {isFavoritesListLoad} = (getState() as RootState).organizationsSlice;

    if (isFavoritesListLoad) {
      return null;
    }

    dispatch(setIsFavoritesListLoad(true));

    return await organizationService.getFavoritesList().finally(() => {
      dispatch(setIsFavoritesListLoad(false));
    });
  },
);

export const getPersonalOrganizations = createAsyncThunk(
  'organization/my/list',
  async (_, {getState, dispatch}) => {
    const {isPersonalOrganizationsLoad} = (getState() as RootState)
      .organizationsSlice;

    if (isPersonalOrganizationsLoad) {
      return null;
    }

    dispatch(setIsPersonalOrganizationsLoad(true));

    return await organizationService.getPersonalOrganizations().finally(() => {
      dispatch(setIsPersonalOrganizationsLoad(false));
    });
  },
);

export const getCreatedStatus = createAsyncThunk(
  'organization/my/created',
  async (_, {getState, dispatch}) => {
    const {isCreatedStatusLoad} = (getState() as RootState).organizationsSlice;

    if (isCreatedStatusLoad) {
      return null;
    }

    dispatch(setIsCreatedStatusLoad(true));

    return await organizationService.getCreatedStatus().finally(() => {
      dispatch(setIsCreatedStatusLoad(false));
    });
  },
);

export const getReviews = createAsyncThunk(
  'organization/reviews',
  async (_, {getState, dispatch}) => {
    const {isReviewsLoad} = (getState() as RootState).organizationsSlice;

    if (isReviewsLoad) {
      return;
    }

    dispatch(setIsReviewsLoad(true));

    return await organizationService.getReviews().finally(() => {
      dispatch(setIsReviewsLoad(false));
    });
  },
);
