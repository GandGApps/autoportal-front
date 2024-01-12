import {RootState} from '../../settings/redux/store';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {organizationService} from './services/OrganizationsService';
import {
  setIsBannersLoad,
  setIsCategoriesLoad,
  setIsCreatedStatusLoad,
  setIsCurrentOrganizationLoad,
  setIsFavoritesListLoad,
  setIsOrganizationFilter,
  setIsPersonalOrganizationsLoad,
  setIsPromotionListLoad,
  setIsSearchLoad,
} from './OrganizationsSlice';
import {CreatePromotionDTO} from './types/OrganizationTypes';

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
    const {isCategoriesLoad} = (getState() as RootState).organizationsSlice;

    if (isCategoriesLoad) {
      return null;
    }

    dispatch(setIsCategoriesLoad(true));

    return await organizationService.getCategories().finally(() => {
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
    const {isOrganizationListLoad, filterForm} = (getState() as RootState)
      .organizationsSlice;

    if (isOrganizationListLoad) {
      return null;
    }

    dispatch(setIsOrganizationFilter(true));

    return await organizationService
      .getOrganizationList(filterForm)
      .finally(() => {
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
    const {isPromotionListLoad, filterForm} = (getState() as RootState)
      .organizationsSlice;

    if (isPromotionListLoad) {
      return null;
    }

    dispatch(setIsPromotionListLoad(true));

    return await organizationService
      .getPromotionsList({
        city: filterForm.city,
        categoryId: filterForm.category?._id || '',
      })
      .finally(() => {
        dispatch(setIsPromotionListLoad(false));
      });
  },
);

export const createPromotion = createAsyncThunk(
  'organization/promotions/create',
  async (dto: CreatePromotionDTO) => {
    const response = await organizationService.createPromotion(dto);

    return response;
  },
);

export const updatePromotion = createAsyncThunk(
  'organization/promotions/update',
  async (dto: CreatePromotionDTO) => {
    const response = await organizationService.updatePromotion(dto);

    return response;
  },
);

export const deletePromotion = createAsyncThunk(
  'organization/promotions/delete',
  async (id: string) => {
    try {
      const response = await organizationService.deletePromotion(id);
      return response;
    } catch (error) {
      throw error; // Перебрасываем ошибку дальше, чтобы ее можно было обработать в компоненте или другом месте
    }
  },
);

export const deleteOrganization = createAsyncThunk(
  'organization/my/delete',
  async (id: string) => {
    try {
      const response = await organizationService.deleteOrganization(id);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const getFavoritesList = createAsyncThunk(
  'organization/favorites/list',
  async (_, {getState, dispatch}) => {
    const {isFavoritesListLoad, filterForm} = (getState() as RootState)
      .organizationsSlice;

    if (isFavoritesListLoad) {
      return null;
    }

    dispatch(setIsFavoritesListLoad(true));

    return await organizationService
      .getFavoritesList(filterForm.category?._id || '')
      .finally(() => {
        dispatch(setIsFavoritesListLoad(false));
      });
  },
);

export const getFavoritesAllList = createAsyncThunk(
  'organization/favorites/list',
  async (_, {getState, dispatch}) => {
    const {isFavoritesListLoad, filterForm} = (getState() as RootState)
      .organizationsSlice;

    if (isFavoritesListLoad) {
      return null;
    }

    dispatch(setIsFavoritesListLoad(true));

    return await organizationService
      .getFavoritesAllList()
      .finally(() => {
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

export const getContacts = createAsyncThunk('contacts/info', async () => {
  const response = await organizationService.getContacts();

  return response;
});


export const updateOrganization = createAsyncThunk(
  'organization/update',
  async (organization, {getState, dispatch}) => {
    const currentOrganization = (getState() as RootState).organizationsSlice
      .currentOrganization;

    const updateOrganizationDTO = {
      ...organization,
      _id: currentOrganization._id,
      brandsCars: currentOrganization.brandsCars,
      employeers: currentOrganization.employeers,
    };

    const response = await organizationService.updateOrganization(
      updateOrganizationDTO,
    );

    return response;
  }
);