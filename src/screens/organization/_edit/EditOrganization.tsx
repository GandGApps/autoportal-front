import React from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {GradientHeader} from '../../../components/GradientHeader';

export const EditOrganizationScreen = () => {
  return (
    <ColumnContainerFlex>
      <GradientHeader title={'Редактирование'} isBack />
    </ColumnContainerFlex>
  );
};
