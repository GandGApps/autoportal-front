import {Screens} from './../../../routes/models/Screens';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {organizationService} from '../services/OrganizationsService';
import {RootState} from '../../../settings/redux/store';
import Navigation from '../../../routes/navigation/Navigation';
import {SuccessOrganization} from '../models/SuccessOrganization';

export const createOrganization = createAsyncThunk(
  'organization/create',
  async (isEdit: boolean, {getState}) => {
    const {createForm} = (getState() as RootState).organizationsSlice;

    const response = await organizationService.createUpdateOrganization(
      createForm,
      isEdit,
    );

    if (isEdit) {
      Navigation.pop();
      return;
    }

    const checkRelease = await organizationService.checkSubStore();

    // TODO: Исправить checkRelease.isSubscribe перед релизом
    if (
      (response as SuccessOrganization).organizationId &&
      !checkRelease.isSubscribe
    ) {
      Navigation.navigate(Screens.SUB_ORGANIZATION, {
        organizationId: (response as SuccessOrganization).organizationId,
      });
    } else {
      Navigation.navigate(Screens.ORGANIZATION_MY);
    }
  },
);
