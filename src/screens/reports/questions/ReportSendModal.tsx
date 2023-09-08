import React from 'react';
import {QuestionModal} from '../../../components/QuestionModal';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';

export const ReportSendModal = () => {
  return (
    <QuestionModal
      title={'Жалоба на рассмотрении'}
      btnMainTitle={'На главную'}
      onMainPress={() => Navigation.navigate(Screens.CATEGORIES)}
    />
  );
};
