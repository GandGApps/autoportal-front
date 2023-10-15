import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import OrganizationsSlice from '../../modules/organizations/OrganizationsSlice';
import UserSlice from '../../modules/user/UserSlice';
import EmployeersSlice from '../../modules/employeers/EmployeersSlice';
import AuthSlice from '../../modules/auth/AuthSlice';
import CitiesSlice from '../../modules/cities/CitiesSlice';
import AdminSlice from '../../modules/admin/AdminSlice';

export const store = configureStore({
  reducer: {
    organizationsSlice: OrganizationsSlice,
    userSlice: UserSlice,
    employeersSlice: EmployeersSlice,
    authSlice: AuthSlice,
    citiesSlice: CitiesSlice,
    adminSlice: AdminSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
