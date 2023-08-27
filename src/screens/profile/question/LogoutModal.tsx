import React from 'react';
import {QuestionModal} from '../../../components/QuestionModal';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';

export const LogoutModal = () => {
  const handleLogOut = () => {
    Navigation.replace(Screens.CATEGORIES);
  };

  return (
    <QuestionModal
      title={'Вы действительно хотите\nвыйти из аккаунта?'}
      btnMainTitle={'Назад'}
      btnSecondTitle={'Выйти'}
      onMainPress={() => Navigation.pop()}
      onSecondPress={handleLogOut}
    />
  );
};
