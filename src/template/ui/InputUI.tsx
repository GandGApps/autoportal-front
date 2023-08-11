import React, {ReactNode} from 'react';
import styled, {css} from 'styled-components/native';
import {MainContainer} from '../containers/MainContainer';
import {ColorsUI} from '../styles/ColorUI';
import {ContainerProps} from '../ui-types/UITypes';
import {TextInputProps} from 'react-native';
import {RowContainerBeetwen} from '../containers/RowContainer';
import {Ag, TextUI} from './TextUI';

export interface InputUIProps extends TextInputProps {
  leftIcon?: ReactNode;
  containerStyles?: ContainerProps;
  rightIcon?: ReactNode;
  isSelect?: boolean;
  $size?: number;
}

export const InputUI = (props: InputUIProps) => {
  return (
    <InputContainerStyled $widthPRC={100} {...props.containerStyles}>
      {props.leftIcon ? props.leftIcon : null}
      {props.isSelect ? (
        <TextUI ag={Ag['400_16']}>{props.value}</TextUI>
      ) : (
        <InputTextStyled
          $size={16}
          {...props}
          placeholderTextColor={ColorsUI.seriy}
        />
      )}

      {props.rightIcon ? (
        <MainContainer $ml={10}>{props.rightIcon}</MainContainer>
      ) : null}
    </InputContainerStyled>
  );
};

const InputContainerStyled = styled(RowContainerBeetwen)`
  padding: 13px;
  border: 1px solid ${ColorsUI.black};
  border-radius: 50px;
`;

const InputTextStyled = styled.TextInput<InputUIProps>`
  flex: 1;
  font-family: 'Montserrat-Regular';
  font-size: ${({$size}) => $size}px;
  line-height: ${({$size}) => $size! * 1.22}px;
  height: ${({$size}) => $size! * 1.22}px;
  color: ${ColorsUI.black};
  margin: 0;
  padding: 0;
`;
