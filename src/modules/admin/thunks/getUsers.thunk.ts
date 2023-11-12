import {createAsyncThunk} from '@reduxjs/toolkit';
import {adminService} from '../service/admin.service';

export const getUsers = createAsyncThunk(
  'admin/users',
  async ({city, dealerId}: {city: string; dealerId?: string}) => {
    const users = await adminService.getUsers(city, dealerId);

    return users;
  },
);
