import styled from 'styled-components/native';
import {ColorsUI} from '../styles/ColorUI';
import {FontHelper} from '../helper/FontHelper';
import {TextProps} from 'react-native';

type TAlign = 'start' | 'center' | 'right' | 'left';
export type TWeight = 700 | 600 | 500 | 400;

export enum Ag {
  '700_16' = '700_16',
  '600_16' = '600_16',
  '600_14' = '600_14',
  '600_13' = '600_13',
  '600_22' = '600_22',
  '600_20' = '600_20',
  '500_20' = '500_20',
  '500_18' = '500_18',
  '500_14' = '500_14',
  '500_16' = '500_16',
  '400_16' = '400_16',
  '400_12' = '400_12',
  '400_10' = '400_10',
}

interface TTextUI extends TStyledP {
  ag: Ag;
  color?: string;
  isNoSelect?: boolean;
}

export const TextUI = (props: TTextUI) => {
  const weight: TWeight = parseInt(props.ag.substring(0, 3)) as TWeight;
  const size = props.ag.substring(4);

  return (
    <TextUIStyled
      {...props}
      size={size}
      $family={FontHelper.getTextFamily(weight)}
      $color={props.color}>
      {props.children}
    </TextUIStyled>
  );
};

interface TStyledP extends TextProps {
  $family?: string;
  size?: string;
  $mb?: number;
  $align?: TAlign;
  $mr?: number;
  $color?: string;
}

const TextUIStyled = styled.Text<TStyledP>`
  font-size: ${({size}) => size}px;
  line-height: ${({size}) => parseInt(size!) * 1.22}px;
  color: ${({$color}) => $color || ColorsUI.black};
  margin-bottom: ${({$mb}) => $mb || 0}px;
  text-align: ${({$align}) => $align || 'left'};
  margin-right: ${({$mr}) => $mr || 0}px;
  font-family: ${({$family}) => $family};
`;
