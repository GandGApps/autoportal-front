import React from 'react';
import {QuestionModal} from '../../../../components/QuestionModal';
import {useAppDispatch, useAppSelector} from '../../../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../../../modules/organizations/OrganizationsSlice';
import Navigation from '../../../../routes/navigation/Navigation';
import {Screens} from '../../../../routes/models/Screens';
import { deleteOrganization, getPersonalOrganizations } from '../../../../modules/organizations/_thunks';

export const RemoveOrganizationModal = () => {
  const {currentOrganization} = useAppSelector(selectOrganizationsValues);

  const dispatch = useAppDispatch();

  const handleRemoveOrganization = async (id: string) => {
    try {
      await dispatch(deleteOrganization(id));

      dispatch(getPersonalOrganizations());

      Navigation.navigate(Screens.ORGANIZATION_MY);
    } catch (error) {
      console.error('Произошла ошибка при удалении организации:', error);
    }
  };

  return (
    <QuestionModal
      title={'Вы действительно хотите\nудалить организацию?'}
      greenTitle={currentOrganization?.name}
      btnMainTitle={'Назад'}
      btnSecondTitle={'Безвозвратно удалить'}
      onMainPress={() => Navigation.pop()}
      onSecondPress={() => handleRemoveOrganization(currentOrganization?._id)}
    />
  );
};
