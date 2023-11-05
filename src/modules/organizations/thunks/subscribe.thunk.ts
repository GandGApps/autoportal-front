import {createAsyncThunk} from '@reduxjs/toolkit';
import {organizationService} from '../services/OrganizationsService';
import {SubscribeDTO} from '../types/OrganizationTypes';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {Notifications} from '../../../template/notifications/Notifications';

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
      });
    }
  },
);

export const approveSubscribe = createAsyncThunk(
  'subscribe/approve',
  async (id: string) => {
    const data = await organizationService.approveSubscribe(id);

    if (data.message === 'success') {
      Navigation.navigate(Screens.PROFILE);
      Navigation.navigate(Screens.ORGANIZATION_MY);

      Notifications.succes('Подписка оформлена');
    }
  },
);
