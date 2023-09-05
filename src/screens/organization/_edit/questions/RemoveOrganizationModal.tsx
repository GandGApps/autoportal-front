import React from 'react';
import {QuestionModal} from '../../../../components/QuestionModal';
import {useAppSelector} from '../../../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../../../modules/organizations/OrganizationsSlice';
import Navigation from '../../../../routes/navigation/Navigation';
import {Screens} from '../../../../routes/models/Screens';

export const RemoveOrganizationModal = () => {
  const {currentOrganization} = useAppSelector(selectOrganizationsValues);

  const handleRemoveOrganization = () => {
    Navigation.navigate(Screens.ORGANIZATION_MY);
  };

  return (
    <QuestionModal
      title={'Вы действительно хотите\nудалить организацию?'}
      greenTitle={currentOrganization?.name}
      btnMainTitle={'Назад'}
      btnSecondTitle={'Безвозвратно удалить'}
      onMainPress={() => Navigation.pop()}
      onSecondPress={handleRemoveOrganization}
    />
  );
};
