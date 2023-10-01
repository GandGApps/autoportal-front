import {createAsyncThunk} from '@reduxjs/toolkit';
import {organizationService} from '../services/OrganizationsService';
import {RootState} from '../../../settings/redux/store';

export const createOrganization = createAsyncThunk(
  'organization/create',
  async (_, {getState}) => {
    const {createForm} = (getState() as RootState).organizationsSlice;

    await organizationService.createOrganization(createForm);
  },
);
