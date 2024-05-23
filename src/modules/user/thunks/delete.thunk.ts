import {createAsyncThunk} from '@reduxjs/toolkit';
import {userService} from '../services/UserService';
import {Notifications} from '../../../template/notifications/Notifications';
import Navigation from '../../../routes/navigation/Navigation';

export const deleteUser = createAsyncThunk(
  'user/delete',
  async (_, {getState, dispatch}) => {
    const user = await userService.deleteUser();

    if (user) {
      Navigation.pop();

      Notifications.succes('Аккаунт удален');
    }
  },
);
