import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {ColorsUI} from '../template/styles/ColorUI';
import {TouchableOpacity} from 'react-native';
import {
  RowContainer,
  RowContainerBeetwen,
} from '../template/containers/RowContainer';
import {Ag, TextUI} from '../template/ui/TextUI';
import {RightIcon} from '../template/icons/RightIcon';
import {MainContainer} from '../template/containers/MainContainer';
import {BorderTopUI} from '../template/ui/BorderTopUI';

interface ThreeMenuItemProps {
  leftIcon?: ReactNode;
  title: string;
  onPress: () => void;
}

export const ThreeMenuItem = (props: ThreeMenuItemProps) => {
  return (
    <BorderTopUI>
      <TouchableOpacity onPress={props.onPress}>
        <RowContainerBeetwen $heightPX={66} $ph={20}>
          <RowContainer>
            {props.leftIcon ? (
              <MainContainer $mr={10}>{props.leftIcon}</MainContainer>
            ) : null}

            <TextUI ag={Ag['500_16']}>{props.title}</TextUI>
          </RowContainer>
          <RightIcon />
        </RowContainerBeetwen>
      </TouchableOpacity>
    </BorderTopUI>
  );
};
