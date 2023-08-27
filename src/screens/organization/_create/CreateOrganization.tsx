import React from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {BottomMenu} from '../../../components/bottomMenu/BottomMenu';
import {GradientHeader} from '../../../components/GradientHeader';

export const CreateOrganizationScreen = () => {
  return (
    <ColumnContainerFlex>
      <GradientHeader title={'Создание организации'} isBack />
      <BottomMenu />
    </ColumnContainerFlex>
  );
};
