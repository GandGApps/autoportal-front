import {createAsyncThunk} from '@reduxjs/toolkit';
import {organizationService} from '../services/OrganizationsService';
import {SubscribeDTO} from '../types/OrganizationTypes';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';

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
      });
    }
  },
);
