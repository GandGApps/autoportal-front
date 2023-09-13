import React from 'react';
import {QuestionModal} from '../../../components/QuestionModal';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {useAppDispatch} from '../../../settings/redux/hooks';
import {logoutAuth} from '../../../modules/auth/thunks/logout.thunks';

export const LogoutModal = () => {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logoutAuth());
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
