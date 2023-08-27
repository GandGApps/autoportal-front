import React from 'react';
import {QuestionModal} from '../../../components/QuestionModal';
import {useAppSelector} from '../../../settings/redux/hooks';
import {selectUserValues} from '../../../modules/user/UserSlice';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';

export const RecoveryPasswordModal = () => {
  const {userInfo} = useAppSelector(selectUserValues);

  return (
    <QuestionModal
      title={'Мы выслали новый пароль\nна Вашу почту:'}
      greenTitle={userInfo?.email}
      btnMainTitle={'На главную'}
      btnSecondTitle={'Вернуться в личные данные'}
      onMainPress={() => Navigation.navigate(Screens.CATEGORIES)}
      onSecondPress={() => Navigation.pop2()}
    />
  );
};
