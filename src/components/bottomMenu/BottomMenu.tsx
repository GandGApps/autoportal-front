import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {ColorsUI} from '../../template/styles/ColorUI';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RowContainerBeetwen} from '../../template/containers/RowContainer';
import {BottomTabs} from './values/BottomTabs';
import {Dimensions} from 'react-native';
import Navigation from '../../routes/navigation/Navigation';
import {BottomTab} from './BottomTab';

export const BottomMenu = () => {
  const insets = useSafeAreaInsets();

  const width = Dimensions.get('window').width - 40;

  const handleNavigate = (screen: string) => {
    Navigation.navigate(screen);
  };

  useEffect(() => {}, []);

  return (
    <BottomMenuStyled
      $widthPX={width}
      $ph={8}
      $pv={8}
      $bottom={Math.max(insets.bottom, 20)}>
      {Object.entries(BottomTabs).map(([key, value]) => (
        <BottomTab
          key={`${key}-${value}`}
          value={value}
          keyTab={key}
          onNavigate={() => handleNavigate(value)}
        />
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
