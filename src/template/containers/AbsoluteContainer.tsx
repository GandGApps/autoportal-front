import styled from 'styled-components/native';
import {MainContainer} from './MainContainer';

interface AbsoluteContainerProps {
  $bottom?: number;
  $top?: number;
  $left?: number;
  $right?: number;
}

export const AbsoluteContainer = styled(MainContainer)<AbsoluteContainerProps>`
  position: absolute;

  ${({$bottom}) => ($bottom ? `bottom: ${$bottom}px;` : '')}
  ${({$top}) => ($top ? `top: ${$top}px;` : '')}
  ${({$left}) => ($left ? `left: ${$left}px;` : '')}
  ${({$right}) => ($right ? `right: ${$right}px;` : '')}
`;
