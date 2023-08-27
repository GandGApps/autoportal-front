import React, {useEffect} from 'react';
import {
  ColumnContainerBetweenFlex,
  ColumnContainerFlex,
} from '../../template/containers/ColumnContainer';
import {BottomMenu} from '../../components/bottomMenu/BottomMenu';
import {GradientHeader} from '../../components/GradientHeader';
import {ThreeMenuItem} from '../../components/ThreeMenuItem';
import {MainContainer} from '../../template/containers/MainContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform, StatusBar} from 'react-native';
import {ColorsUI} from '../../template/styles/ColorUI';
import {useAppDispatch, useAppSelector} from '../../settings/redux/hooks';
import {getCreatedStatus} from '../../modules/organizations/_thunks';
import {selectOrganizationsValues} from '../../modules/organizations/OrganizationsSlice';
import Navigation from '../../routes/navigation/Navigation';
import {FirstOrganization} from './components/FirstOrganization';
import {Screens} from '../../routes/models/Screens';
import {UnderLineText} from '../../components/UnderLineText';

export const ProfileScreen = () => {
  const {createdStatus} = useAppSelector(selectOrganizationsValues);
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getCreatedStatus());
    }, 0);
  }, []);

  const handleGoToScreen = (screen: string) => {
    Navigation.navigate(screen);
  };

  return (
    <ColumnContainerFlex>
      <StatusBar barStyle={'light-content'} backgroundColor={ColorsUI.black} />
      <GradientHeader title={'Личный кабинет'} />
      <ColumnContainerBetweenFlex>
        <MainContainer>
          {!createdStatus?.createdStatus ? <FirstOrganization /> : null}

          <ThreeMenuItem
            title={'Мои данные'}
            onPress={() => handleGoToScreen(Screens.PROFILE_INFO)}
          />
          <ThreeMenuItem
            title={'Мои организации'}
            onPress={() => handleGoToScreen(Screens.ORGANIZATION_MY)}
          />
          <ThreeMenuItem title={'Частые вопросы'} onPress={() => {}} />
          <ThreeMenuItem title={'О приложениие'} onPress={() => {}} />
          {createdStatus?.createdStatus ? (
            <ThreeMenuItem
              title={'Купить баннер на главном экране'}
              onPress={() => {}}
            />
          ) : null}
        </MainContainer>
        <MainContainer
          $mb={
            Platform.OS === 'android' ? insets.bottom + 120 : insets.bottom + 90
          }>
          <UnderLineText $mt={10} $ph={20} text={'Договор публичной оферты'} />
          <UnderLineText
            $mt={10}
            $ph={20}
            text={'Политика конфиденциальности'}
          />
          <UnderLineText
            $mt={10}
            $ph={20}
            text={'Договор на обработку персональных данных'}
          />
        </MainContainer>
      </ColumnContainerBetweenFlex>
      <BottomMenu />
    </ColumnContainerFlex>
  );
};
