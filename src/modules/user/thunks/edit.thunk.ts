import {getUserInfo} from './../_thunks';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {userService} from '../services/UserService';
import {RootState} from '../../../settings/redux/store';
import {Notifications} from '../../../template/notifications/Notifications';
import Navigation from '../../../routes/navigation/Navigation';

export const editUser = createAsyncThunk(
  'user/edit',
  async (_, {getState, dispatch}) => {
    const {editForm} = (getState() as RootState).userSlice;

    const user = await userService.editUser(editForm);

    if (user) {
      await dispatch(getUserInfo());

      Navigation.pop();

      Notifications.succes('Данные обновлены');
    }
  },
);
