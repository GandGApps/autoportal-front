import {createAsyncThunk} from '@reduxjs/toolkit';
import {adminService} from '../service/admin.service';
import {FinanceDTO} from '../types/AdminTypes';
import {Notifications} from '../../../template/notifications/Notifications';

export const changeFinanceSettings = createAsyncThunk(
  'admin/sub/finance',
  async (dto: FinanceDTO) => {
    const finance = await adminService.changeFinanceSettings(dto);

    if (finance.message === 'success') {
      Notifications.succes('Данные обновлены');
    } else {
      Notifications.error('Ошибка');
    }
  },
);
