import React, {ReactNode} from 'react';
import styled, {css} from 'styled-components/native';
import {MainContainer} from '../containers/MainContainer';
import {ColorsUI} from '../styles/ColorUI';
import {ContainerProps} from '../ui-types/UITypes';
import {TextInputProps} from 'react-native';
import {RowContainerBeetwen} from '../containers/RowContainer';
import {Ag, TAlign, TStyledP, TextUI} from './TextUI';

export interface InputUIProps extends TextInputProps {
  leftIcon?: ReactNode;
  containerStyles?: ContainerProps;
  rightIcon?: ReactNode;
  isSelect?: boolean;
  $size?: number;
  ag?: Ag;
  $align?: TAlign;
  styleP?: TStyledP;
}

export const InputUI = (props: InputUIProps) => {
  return (
    <InputContainerStyled {...props.containerStyles}>
      {props.leftIcon ? props.leftIcon : null}
      {props.isSelect ? (
        <TextUI
          {...props.styleP}
          ag={props.ag || Ag['400_16']}
          color={props.value ? ColorsUI.black : ColorsUI.seriy}>
          {props.value || props.placeholder}
        </TextUI>
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
