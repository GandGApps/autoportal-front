import {createAsyncThunk} from '@reduxjs/toolkit';
import {organizationService} from '../services/OrganizationsService';

export const getServices = createAsyncThunk(
  'organization/get/services',
  async (categoryId: string) => {
    const response = await organizationService.getServices(categoryId);

    return response;
  },
);
