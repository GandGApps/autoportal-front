import React, {useRef} from 'react';
import {AbsoluteContainer} from '../../../../template/containers/AbsoluteContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {RouteIcon} from '../../../../template/icons/RouteIcon';
import {
  RowContainer,
  RowContainerBeetwen,
} from '../../../../template/containers/RowContainer';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {PhoneIcon} from '../../../../template/icons/PhoneIcon';
import {Linking} from 'react-native';
import {CurrentOrganization} from '../../../../modules/organizations/models/CurrentOrganization';
import {SwipeableModal} from '../../../../components/SwipbleModal';
import {Modalize} from 'react-native-modalize';
import {ButtonUI} from '../../../../template/ui/ButtonUI';

interface CompProps {
  organization: CurrentOrganization;
}

export const OrgBottomMenu = ({organization}: CompProps) => {
  const modalRef = useRef<Modalize>(null);
  const insets = useSafeAreaInsets();

  const handleOpenYandex = () => {
    Linking.openURL(
      `https://yandex.ru/maps/?text=${organization.city},${organization.address}`,
    );
  };
  const handleOpenGoogle = () => {
    Linking.openURL(
      `https://www.google.com/maps?q=${organization.city},${organization.address}`,
    );
  };

  return (
    <AbsoluteContainer $widthPRC={100} $bottom={Math.max(insets.bottom, 20)}>
      <RowContainer $ph={20}>
        <ViewPress
          $bg={ColorsUI.black}
          $pv={8}
          $ph={8}
          $br={50}
          $isFlex
          $mr={15}
          activeOpacity={0.8}
          onPress={() => modalRef.current?.open()}>
          <RowContainerBeetwen>
            <RouteIcon />
            <TextUI ag={Ag['500_16']} color={ColorsUI.firm}>
              {'Проложить маршрут'}
            </TextUI>
            <MainContainer $widthPX={36} $heightPX={36} />
          </RowContainerBeetwen>
        </ViewPress>

        <ViewPress
          activeOpacity={0.8}
          onPress={() => {
            Linking.openURL(`tel:${organization.mainPhone}`);
          }}>
          <PhoneIcon
            size={52}
            color={ColorsUI.black}
            fillColor={ColorsUI.firm}
          />
        </ViewPress>
      </RowContainer>

      <SwipeableModal modalizeRef={modalRef}>
        <MainContainer $mb={insets.bottom}>
          <TextUI $mb={20} $align={'center'} ag={Ag['500_16']}>
            {'Выберите навигатор'}
          </TextUI>

          <ButtonUI
            $type={'firm'}
            $mb={10}
            title={'Яндекс Карты'}
            onPress={handleOpenYandex}
          />
          <ButtonUI title={'Google Maps'} onPress={handleOpenGoogle} />
        </MainContainer>
      </SwipeableModal>
    </AbsoluteContainer>
  );
};
