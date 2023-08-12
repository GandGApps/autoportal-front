import React from 'react';
import styled from 'styled-components/native';
import {ColorsUI} from '../../template/styles/ColorUI';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RowContainerBeetwen} from '../../template/containers/RowContainer';
import {BottomTabs, BottomTabsKey} from './values/BottomTabs';
import {Dimensions, TouchableOpacity} from 'react-native';
import {BottomIcons} from './icons/BottomIcons';
import Navigation from '../../routes/navigation/Navigation';

export const BottomMenu = () => {
  const insets = useSafeAreaInsets();

  const width = Dimensions.get('window').width - 40;

  const handleNavigate = (screen: string) => {
    Navigation.navigate(screen);
  };

  return (
    <BottomMenuStyled
      $widthPX={width}
      $ph={8}
      $pv={8}
      $bottom={Math.max(insets.bottom, 20)}>
      {Object.entries(BottomTabs).map(([key, value]) => (
        <TouchableOpacity
          key={`${key}-${value}`}
          onPress={() => handleNavigate(value)}>
          <BottomIcons
            bottomKey={key as BottomTabsKey}
            isActive={Navigation.getCurrentScreen() === value}
          />
        </TouchableOpacity>
      ))}
    </BottomMenuStyled>
  );
};

interface BottomMenuStyledProps {
  $bottom: number;
}

const BottomMenuStyled = styled(RowContainerBeetwen)<BottomMenuStyledProps>`
  background-color: ${ColorsUI.black};
  position: absolute;
  left: 20px;
  bottom: ${({$bottom}) => $bottom}px;
  border-radius: 50px;
`;
