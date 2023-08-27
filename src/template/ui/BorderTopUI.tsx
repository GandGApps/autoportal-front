import React from 'react';
import styled from 'styled-components/native';
import {MainContainer} from '../containers/MainContainer';
import {ColorsUI} from '../styles/ColorUI';

interface BorderTopUIProps {
  $colorLine?: string;
  $lineSize?: number;
}

export const BorderTopUI = styled(MainContainer)<BorderTopUIProps>`
  border-top-width: ${({$lineSize}) => ($lineSize ? $lineSize : 1)}px;
  border-top-color: ${({$colorLine}) => $colorLine || ColorsUI.gray.line};
`;
