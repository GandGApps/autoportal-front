import {createAsyncThunk} from '@reduxjs/toolkit';
import {adminService} from '../service/admin.service';

export const getUsers = createAsyncThunk(
  'admin/users',
  async (city: string) => {
    const users = await adminService.getUsers(city);

    return users;
  },
);
