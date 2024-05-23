import React from 'react';

import {QuestionModal} from '../../../components/QuestionModal';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {deleteUser} from '../../../modules/user/thunks/delete.thunk';
import {useAppDispatch} from '../../../settings/redux/hooks';

export const RemoveProfileModal = () => {
  const dispatch = useAppDispatch();
  const handleGoToScreen = (screen: string) => {
    Navigation.navigate(screen);
  };

  const handleRemoveAccount = () => {
    dispatch(deleteUser()).finally(() => {
      handleGoToScreen(Screens.WELCOME);
    });
  };

  return (
    <QuestionModal
      title={
        'Вы действительно удалить аккаунт?\nВсе данные, включая активные подписки и все ваши организации, будут безвозвратно удалены.'
      }
      btnMainTitle={'Назад'}
      btnSecondTitle={'Удалить'}
      onMainPress={() => Navigation.pop()}
      onSecondPress={handleRemoveAccount}
    />
  );
};
