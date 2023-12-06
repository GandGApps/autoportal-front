import React from 'react';
import {QuestionModal} from '../../../../components/QuestionModal';
import Navigation from '../../../../routes/navigation/Navigation';
import {useAppDispatch} from '../../../../settings/redux/hooks';
import {
  deletePromotion,
  getPersonalOrganizations,
} from '../../../../modules/organizations/_thunks';
import {Screens} from '../../../../routes/models/Screens';

export const PromoRemoveModal = ({route}) => {
  const {promoIdToDelete} = route.params;

  const dispatch = useAppDispatch();

  const handleRemovePromo = async (id: string) => {
    try {
      await dispatch(deletePromotion(id));

      dispatch(getPersonalOrganizations());

      Navigation.navigate(Screens.ORGANIZATION_MY);
    } catch (error) {
      // Обработка ошибок, возникших в процессе запроса
      console.error('Произошла ошибка при удалении акции:', error);
    }
  };

  const handleNavigateBack = () => {
    Navigation.pop();
  };

  return (
    <QuestionModal
      title={'Вы действительно хотете\nудалить акцию?'}
      btnMainTitle={'Нет'}
      btnSecondTitle={'Да, удалить'}
      onMainPress={() => handleNavigateBack()}
      onSecondPress={() => handleRemovePromo(promoIdToDelete)}
    />
  );
};
