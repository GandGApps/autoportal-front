import React from 'react';
import styled from 'styled-components/native';
import {ContainerProps} from '../ui-types/UITypes';
import {defaultContainerCSS} from '../containers/MainContainer';
import {ButtonWidthCSS} from './ButtonUI';
import {ColorsUI} from '../styles/ColorUI';
import {RowContainerBeetwen} from '../containers/RowContainer';
import {Ag, TextUI} from './TextUI';
import {DownIcon} from '../icons/DownIcon';
import {TouchableOpacityProps} from 'react-native';

interface SelectUIProps extends TouchableOpacityProps {
  text: string;
}

export const SelectUI = (props: SelectUIProps) => {
  return (
    <SelectUIStyled {...props} $pv={8} $ph={8}>
      <RowContainerBeetwen>
        <TextUI color={ColorsUI.seriy} ag={Ag['400_16']}>
          {props.text}
        </TextUI>
        <DownIcon />
      </RowContainerBeetwen>
    </SelectUIStyled>
  );
};

const SelectUIStyled = styled.TouchableOpacity<ContainerProps>`
  ${defaultContainerCSS}
  ${ButtonWidthCSS}

  background-color: ${ColorsUI.gray.disabled};
  border-radius: 50px;
`;
