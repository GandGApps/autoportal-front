import {organizationService} from '../services/OrganizationsService';
import {ApproveSubscribeDTO, SubscribeDTO} from '../types/OrganizationTypes';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {Notifications} from '../../../template/notifications/Notifications';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getPersonalOrganizations} from '../_thunks';

export const getSubInfo = createAsyncThunk('subscribe/info', async () => {
  const subInfo = await organizationService.getSubInfo();

  return subInfo;
});

export const getSubcribe = createAsyncThunk(
  'subscribe/payment',
  async ({type, id}: SubscribeDTO) => {
    const response = await organizationService.getSubscribe(type, id);

    if (response.data) {
      Navigation.navigate(Screens.SUBSCRIBE_MODAL, {
        url: response.data,
        organizationId: id,
        type,
      });
    }
  },
);

export const approveSubscribe = createAsyncThunk(
  'subscribe/approve',
  async ({id, type}: ApproveSubscribeDTO) => {
    const data = await organizationService.approveSubscribe(id, type);

    if (data.message === 'success') {
      Navigation.navigate(Screens.PROFILE);
      Navigation.navigate(Screens.ORGANIZATION_MY);

      Notifications.succes('Подписка оформлена');
    }
  },
);

export const resumeSubscribe = createAsyncThunk(
  'subscribe/resume',
  async (id: string, {dispatch}) => {
    await organizationService.resumeSubscribe(id);

    Notifications.succes('Автоплатеж подключен');

    await dispatch(getPersonalOrganizations());
  },
);

export const deactivateSubscribe = createAsyncThunk(
  'subscribe/deactivated',
  async (id: string, {dispatch}) => {
    await organizationService.deactivateSubscribe(id);

    Notifications.succes('Автоплатеж отменен');

    await dispatch(getPersonalOrganizations());
  },
);
