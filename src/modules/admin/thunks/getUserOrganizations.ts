import {createAsyncThunk} from '@reduxjs/toolkit';
import {adminService} from '../service/admin.service';
export const getUserOrganizations = createAsyncThunk(
  'admin/user/organizations',
  async (dealerId: string) => {
    const organizations = await adminService.getUserOrganizations(dealerId);

    return organizations;
  },
);
