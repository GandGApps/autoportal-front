import React from 'react';
import {QuestionModal} from '../../../components/QuestionModal';
import Navigation from '../../../routes/navigation/Navigation';

export const RemoveProfileModal = () => {
  const handleRemoveAccount = () => {};

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
