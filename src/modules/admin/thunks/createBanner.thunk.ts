import {createAsyncThunk} from '@reduxjs/toolkit';
import {CreateBannerDTO} from '../types/AdminTypes';
import {adminService} from '../service/admin.service';

export const createBanner = createAsyncThunk(
  'banners/create',
  async (dto: CreateBannerDTO) => {
    const data = await adminService.createBanner(dto);

    return data;
  },
);
