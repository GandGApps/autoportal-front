import React from 'react';
import {QuestionModal} from '../../../components/QuestionModal';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';

export const ReportSendModal = () => {
  return (
    <QuestionModal
      title={'Жалоба отправлена на рассмотрение'}
      btnSecondTitle={'На главную'}
      btnMainTitle={'Назад'}
      onMainPress={() => Navigation.pop()}
      onSecondPress={() => Navigation.navigate(Screens.CATEGORIES)}
    />
  );
};
