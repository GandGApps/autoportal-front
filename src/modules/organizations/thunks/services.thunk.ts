import {createAsyncThunk} from '@reduxjs/toolkit';

export const getServices = createAsyncThunk(
  'organization/get/services',
  (organizationId: string) => {},
);
