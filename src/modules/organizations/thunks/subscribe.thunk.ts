import {createAsyncThunk} from '@reduxjs/toolkit';
import {organizationService} from '../services/OrganizationsService';

export const getSubInfo = createAsyncThunk('subscribe/info', async () => {
  const subInfo = await organizationService.getSubInfo();

  return subInfo;
});
