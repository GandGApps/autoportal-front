import {Dimensions, StatusBar} from 'react-native';
import {AbsoluteContainer} from '../../template/containers/AbsoluteContainer';
import {
  ColumnContainerFlex,
  ColumnContainerFlexEnd,
} from '../../template/containers/ColumnContainer';
import {MainContainer} from '../../template/containers/MainContainer';
import {ImageUI} from '../../template/ui/ImageUI';
import {ColorsUI} from '../../template/styles/ColorUI';
import {ButtonUI} from '../../template/ui/ButtonUI';
import {Insets} from '../../template/styles/Insets';
import {Ag, TextUI} from '../../template/ui/TextUI';
import {useAppDispatch, useAppSelector} from '../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../modules/organizations/OrganizationsSlice';
import {ViewPress} from '../../template/containers/ViewPress';
import {RowContainer} from '../../template/containers/RowContainer';
import {LocationIcon} from '../../template/icons/LocationIcon';
import {DownIcon} from '../../template/icons/DownIcon';
import {CenterContainer} from '../../template/containers/CenterContainer';
import Navigation from '../../routes/navigation/Navigation';
import {Screens} from '../../routes/models/Screens';
import {useRef, useState} from 'react';
import {CitiesModal} from '../../components/CitiesModal';
import {Modalize} from 'react-native-modalize';

export const WelcomeScreen = () => {
  const {filterForm} = useAppSelector(selectOrganizationsValues);
  console.log( 'filterform city',filterForm.city)

  const cityModal = useRef<Modalize>(null);

  const [isError, setIsError] = useState(false);

  const handleOpenModal = () => {
    setIsError(false);
    cityModal.current?.open();
  };

  const handleGoToGuest = async () => {
    if (!filterForm.city) {
      setIsError(true);
      return;
    }

    Navigation.navigate(Screens.CATEGORIES);
  };

  const handleGoToAuth = () => {
    Navigation.navigate(Screens.AUTH);
  };

  return (
    <ColumnContainerFlex>
      <StatusBar barStyle={'light-content'} backgroundColor={ColorsUI.black} />
      <ImageUI
        $isFlex
        $widthPRC={100}
        resizeMode={'cover'}
        source={require('./../../../assets/img/back-auth.jpg')}
      />
      <AbsoluteContainer
        $top={0}
        $left={0}
        $widthPX={Dimensions.get('screen').width}
        $heightPX={Dimensions.get('screen').height}
        $bg={ColorsUI.opacity}
      />

      <AbsoluteContainer
        $top={0}
        $left={0}
        $bottom={Math.max(Insets.bottom, 20)}
        $widthPX={Dimensions.get('screen').width}
        $heightPX={Dimensions.get('screen').height}>
        <ColumnContainerFlex $ph={20}>
          <ColumnContainerFlex />
          <CenterContainer $mb={40}>
            <ImageUI
              style={{width: 250, height: 250}}
              resizeMode={'contain'}
              source={require('./../../../assets/img/logo_transparent.png')}
            />
          </CenterContainer>
          <MainContainer $mb={20}>
            <TextUI
              ag={Ag['500_16']}
              $align={'center'}
              $mb={40}
              color={ColorsUI.white}>
              {'Поможем найти тех, кто нужен\nВам и Вашему автомобилю'}
            </TextUI>

            <CenterContainer>
              <ViewPress
                $borderColor={ColorsUI.white}
                $pv={8}
                $ph={10}
                $br={50}
                $mb={30}
                onPress={handleOpenModal}>
                <RowContainer>
                  <LocationIcon color={ColorsUI.white} />
                  <MainContainer $ph={10}>
                    <TextUI color={ColorsUI.white} ag={Ag['400_16']}>
                      {filterForm.city || 'Местоположение'}
                    </TextUI>
                  </MainContainer>
                  <DownIcon color={ColorsUI.white} />
                </RowContainer>
              </ViewPress>
            </CenterContainer>

            <TextUI
              $align={'center'}
              color={ColorsUI.powerRed}
              ag={Ag['500_16']}>
              {isError ? 'Выберите ваше местоположение' : ' '}
            </TextUI>
          </MainContainer>
          <ButtonUI
            $mb={10}
            $type={'border-white'}
            title={'Войти как гость'}
            onPress={handleGoToGuest}
          />
          <ButtonUI
            $type={'firm'}
            title={'Авторизация'}
            onPress={handleGoToAuth}
          />
        </ColumnContainerFlex>
      </AbsoluteContainer>

      <CitiesModal modalizeRef={cityModal} />
    </ColumnContainerFlex>
  );
};
