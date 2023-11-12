import React from 'react';
import {
  ColumnContainerBetweenFlex,
  ColumnContainerFlex,
} from '../../template/containers/ColumnContainer';
import {BottomMenu} from '../../components/bottomMenu/BottomMenu';
import {GradientHeader} from '../../components/GradientHeader';
import {ThreeMenuItem} from '../../components/ThreeMenuItem';
import {MainContainer} from '../../template/containers/MainContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Linking, Platform, StatusBar} from 'react-native';
import {ColorsUI} from '../../template/styles/ColorUI';
import {useAppSelector} from '../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../modules/organizations/OrganizationsSlice';
import Navigation from '../../routes/navigation/Navigation';
import {FirstOrganization} from './components/FirstOrganization';
import {Screens} from '../../routes/models/Screens';

export const ProfileScreen = () => {
  const {createdStatus, contacts} = useAppSelector(selectOrganizationsValues);
  const insets = useSafeAreaInsets();

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
          {createdStatus?.createdStatus ? (
            <ThreeMenuItem
              title={'Разместить баннер\nна главном экране'}
              onPress={() => {
                if (contacts?.orderBanner) {
                  Linking.openURL(contacts.orderBanner);
                }
              }}
            />
          ) : null}
        </MainContainer>
      </ColumnContainerBetweenFlex>
      <BottomMenu />
    </ColumnContainerFlex>
  );
};
