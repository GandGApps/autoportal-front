import {Screens} from './../../../routes/models/Screens';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {organizationService} from '../services/OrganizationsService';
import {RootState} from '../../../settings/redux/store';
import Navigation from '../../../routes/navigation/Navigation';

export const createOrganization = createAsyncThunk(
  'organization/create',
  async (isEdit: boolean, {getState}) => {
    const {createForm} = (getState() as RootState).organizationsSlice;

    const response = await organizationService.createOrganization(createForm);

    if (isEdit) {
      Navigation.pop();
      return;
    }

    const checkRelease = await organizationService.checkSubStore();

    // TODO: Исправить checkRelease.isSubscribe перед релизом
    if (response.organizationId && !checkRelease.isSubscribe) {
      Navigation.navigate(Screens.SUB_ORGANIZATION, {
        organizationId: response.organizationId,
      });
    } else {
      Navigation.navigate(Screens.ORGANIZATION_MY);
    }
  },
);
