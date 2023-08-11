import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import OrganizationsSlice from '../../modules/organizations/OrganizationsSlice';

export const store = configureStore({
  reducer: {
    organizationsSlice: OrganizationsSlice,
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
