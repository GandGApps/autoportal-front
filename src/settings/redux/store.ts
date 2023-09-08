import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import OrganizationsSlice from '../../modules/organizations/OrganizationsSlice';
import UserSlice from '../../modules/user/UserSlice';
import EmployeersSlice from '../../modules/employeers/EmployeersSlice';
import AuthSlice from '../../modules/auth/AuthSlice';

export const store = configureStore({
  reducer: {
    organizationsSlice: OrganizationsSlice,
    userSlice: UserSlice,
    employeersSlice: EmployeersSlice,
    authSlice: AuthSlice,
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
