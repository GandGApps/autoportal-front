import {createAsyncThunk} from '@reduxjs/toolkit';
import {organizationService} from '../services/OrganizationsService';

interface ThunkProps {
  id: string;
  type: 'add' | 'delete';
}

export const changeOrganizationFavorite = createAsyncThunk(
  'organization/create',
  async ({id, type}: ThunkProps) => {
    const message =
      type === 'add'
        ? await organizationService.addFavoriteOrganization(id)
        : await organizationService.deleteFavoriteOrganization(id);

    return message;
  },
);
