import React from 'react';
import {QuestionModal} from '../../../../components/QuestionModal';
import Navigation from '../../../../routes/navigation/Navigation';

export const PromoRemoveModal = () => {
  const handleRemovePromo = () => {};

  return (
    <QuestionModal
      title={'Вы действительно хотете\nудалить акцию?'}
      btnMainTitle={'Нет'}
      btnSecondTitle={'Да, удалить'}
      onMainPress={() => Navigation.pop()}
      onSecondPress={handleRemovePromo}
    />
  );
};
