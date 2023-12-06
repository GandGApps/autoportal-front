import React from 'react';
import {QuestionModal} from '../../../../components/QuestionModal';
import Navigation from '../../../../routes/navigation/Navigation';
import { useAppDispatch } from '../../../../settings/redux/hooks';
import { deletePromotion } from '../../../../modules/organizations/_thunks';
import { Screens } from '../../../../routes/models/Screens';

export const PromoRemoveModal = ({route}) => {
  const {promoIdToDelete} = route.params;

  console.log('promoIdToDelete:', promoIdToDelete);
  const dispatch = useAppDispatch();

  const handleRemovePromo = async (id: string) => {
    try {
      // Выполняем запрос на удаление акции
      const response = await dispatch(deletePromotion(id));
  
      // Проверяем, успешно ли выполнено удаление
      if (response && response.meta && response.meta.requestStatus === "fulfilled") {
        // Успешное удаление, выполняем Navigation.pop()
        console.log("Успешное удаление:", response.payload.message);
        Navigation.navigate(Screens.ORGANIZATION_MY);
      } else {
        // Неудачное удаление, выводим сообщение об ошибке
        console.error("Ошибка при удалении акции:", response.payload.message);
        // Возможно, вам нужно как-то обработать неудачное удаление
      }
    } catch (error) {
      // Обработка ошибок, возникших в процессе запроса
      console.error("Произошла ошибка при удалении акции:", error);
    }
  };
  

  const handleNavigateBack = () => {
    Navigation.pop();
  }

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
