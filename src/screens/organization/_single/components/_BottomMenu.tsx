import React from 'react';
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

export const OrgBottomMenu = () => {
  const insets = useSafeAreaInsets();

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
          activeOpacity={0.8}>
          <RowContainerBeetwen>
            <RouteIcon />
            <TextUI ag={Ag['500_16']} color={ColorsUI.firm}>
              {'Проложить маршрут'}
            </TextUI>
            <MainContainer $widthPX={36} $heightPX={36} />
          </RowContainerBeetwen>
        </ViewPress>

        <ViewPress activeOpacity={0.8}>
          <PhoneIcon
            size={52}
            color={ColorsUI.black}
            fillColor={ColorsUI.firm}
          />
        </ViewPress>
      </RowContainer>
    </AbsoluteContainer>
  );
};
