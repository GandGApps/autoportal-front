import React from 'react';
import {GradientHeader} from '../../../../components/GradientHeader';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import Navigation from '../../../../routes/navigation/Navigation';
import {Screens} from '../../../../routes/models/Screens';

export const MyOrganizationkHeader = () => {
  return (
    <GradientHeader
      title={'Мои организации'}
      isBack
      rightComonent={
        <ViewPress
          $bg={ColorsUI.firm}
          $br={50}
          $pv={5}
          $ph={20}
          onPress={() => Navigation.navigate(Screens.ORGANIZATION_CREATE)}>
          <TextUI ag={Ag['500_14']}>{'Создать'}</TextUI>
        </ViewPress>
      }
    />
  );
};
