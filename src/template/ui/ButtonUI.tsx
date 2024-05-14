import React from 'react';
import styled, {css} from 'styled-components/native';
import {defaultContainerCSS} from '../containers/MainContainer';
import {ButtonHelper} from '../helper/ButtonHelper';
import {ContainerProps} from '../ui-types/UITypes';
import {Ag, TextUI} from './TextUI';

export type TButton = 'border' | 'border-white' | 'firm' | 'black';

interface ButtonUIProps extends ContainerProps {
  $type?: TButton;
  $btnDisabled?: boolean;
  fontSize?: number;
  color?: string;
  title: string;
  onPress?: () => void;
}

export const ButtonUI = (props: ButtonUIProps) => {
  const type = props.$type || 'black';

  return (
    <ButtonUIStyled
      activeOpacity={0.7}
      disabled={props.$btnDisabled}
      {...props}
      $type={type}
      $pv={props.$pv || 15}>
      <TextUI
        style={{
          fontSize: props.fontSize,
        }}
        color={props.color || ButtonHelper.getTextColor(type)}
        ag={Ag['500_16']}
        $align={'center'}>
        {props.title}
      </TextUI>
    </ButtonUIStyled>
  );
};

export const ButtonWidthCSS = css<ContainerProps>`
  ${({$widthPRC, $widthPX}) =>
    $widthPX || $widthPRC
      ? `width: ${$widthPX || $widthPRC}${$widthPX ? 'px' : '%'};`
      : 'width: 100%;'}
`;

const ButtonUIStyled = styled.TouchableOpacity<ButtonUIProps>`
  ${defaultContainerCSS}
  ${ButtonWidthCSS}

  background-color: ${({$type}) => ButtonHelper.getBackColor($type!)};
  border-radius: 50px;

  ${({$type}) =>
    ButtonHelper.checkIsBorder($type!)
      ? `border: 1px solid ${ButtonHelper.getBorderColor($type!)};`
      : ''}

  ${({$btnDisabled}) => ($btnDisabled ? 'opacity: 0.6;' : '')}
`;
