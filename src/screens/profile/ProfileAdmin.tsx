import React from 'react';
import {
  ColumnContainerBetweenFlex,
  ColumnContainerFlex,
} from '../../template/containers/ColumnContainer';
import {BottomMenu} from '../../components/bottomMenu/BottomMenu';
import {GradientHeader} from '../../components/GradientHeader';
import {ThreeMenuItem} from '../../components/ThreeMenuItem';
import {StatusBar} from 'react-native';
import {ColorsUI} from '../../template/styles/ColorUI';
import Navigation from '../../routes/navigation/Navigation';
import {Screens} from '../../routes/models/Screens';

export const ProfileAdmin = () => {
  const handleGoToScreen = (screen: string) => {
    Navigation.navigate(screen);
  };

  return (
    <ColumnContainerFlex>
      <StatusBar barStyle={'light-content'} backgroundColor={ColorsUI.black} />
      <GradientHeader title={'Админ.панель'} />
      <ThreeMenuItem
        title={'Пользователи'}
        onPress={() => handleGoToScreen(Screens.ADMIN_USERS)}
      />
      <ThreeMenuItem
        title={'Категории'}
        onPress={() => handleGoToScreen(Screens.ADMIN_CATEGORIES)}
      />
      <ThreeMenuItem
        title={'Финансовые настройки'}
        onPress={() => handleGoToScreen(Screens.ADMIN_FINANCE)}
      />
      <ThreeMenuItem
        title={'Рекламный баннер'}
        onPress={() => handleGoToScreen(Screens.ADMIN_BANNERS)}
      />
      <ThreeMenuItem
        title={'Выйти'}
        onPress={() => handleGoToScreen(Screens.LOGOUT_MODAL)}
      />
      <BottomMenu />
    </ColumnContainerFlex>
  );
};
