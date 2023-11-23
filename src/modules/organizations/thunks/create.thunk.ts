import {DefaultCreateForm} from './../form/CreateForm';
import {Screens} from './../../../routes/models/Screens';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {organizationService} from '../services/OrganizationsService';
import {RootState} from '../../../settings/redux/store';
import Navigation from '../../../routes/navigation/Navigation';
import {SuccessOrganization} from '../models/SuccessOrganization';
import {setDefaultCreateForm} from '../OrganizationsSlice';

export const createOrganization = createAsyncThunk(
  'organization/create',
  async (isEdit: boolean, {getState, dispatch}) => {
    const {createForm, checkRelease} = (getState() as RootState)
      .organizationsSlice;

    const response = await organizationService.createUpdateOrganization(
      createForm,
      isEdit,
    );

    if (isEdit) {
      Navigation.pop();
      return;
    }

    dispatch(setDefaultCreateForm(DefaultCreateForm));

    if ((response as SuccessOrganization).organizationId && checkRelease) {
      Navigation.navigate(Screens.SUB_ORGANIZATION, {
        organizationId: (response as SuccessOrganization).organizationId,
      });
    } else {
      Navigation.navigate(Screens.PROFILE);
      Navigation.navigate(Screens.ORGANIZATION_MY);
    }
  },
);

export const checkRelease = createAsyncThunk(
  'organization/checkRelease',
  async () => {
    return await organizationService.checkSubStore();
  },
);
