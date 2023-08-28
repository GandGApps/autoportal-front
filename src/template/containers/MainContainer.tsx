import styled from 'styled-components/native';
import {ContainerProps} from '../ui-types/UITypes';
import {css} from 'styled-components/native';
import {ColorsUI} from '../styles/ColorUI';

export const defaultContainerCSS = css<ContainerProps>`
  display: flex;
  flex-direction: column;

  margin-bottom: ${({$mb}) => $mb || 0}px;
  margin-right: ${({$mr}) => $mr || 0}px;
  margin-left: ${({$ml}) => $ml || 0}px;

  margin-top: ${({$mt}) => $mt || 0}px;

  padding: ${({$pv}) => $pv || 0}px ${({$ph}) => $ph || 0}px;

  padding-left: ${({$pl, $ph}) => $pl || $ph || 0}px;
  padding-right: ${({$pr, $ph}) => $pr || $ph || 0}px;

  ${({$br}) => ($br ? `border-radius: ${$br}px;` : '')}

  padding-top: ${({$pt, $pv}) => $pt || $pv || 0}px;
  padding-bottom: ${({$pb, $pv}) => $pb || $pv || 0}px;

  ${({$widthPRC, $widthPX, $isFitContent}) =>
    $isFitContent
      ? 'width: fit-content;'
      : $widthPX || $widthPRC
      ? `width: ${$widthPX || $widthPRC}${$widthPX ? 'px' : '%'};`
      : ''}

  ${({$isRelative}) => ($isRelative ? `position: relative;` : '')}


  ${({$bg}) => ($bg ? `background-color: ${$bg};` : '')}

  ${({$heightPX}) => ($heightPX ? `height: ${$heightPX}px;` : '')}

  ${({$isFlex}) => ($isFlex ? 'flex: 1;' : '')}

  ${({$borderColor}) =>
    $borderColor ? `border: 1px solid ${$borderColor};` : ''}
`;

export const MainContainer = styled.View<ContainerProps>`
  ${defaultContainerCSS}
`;
