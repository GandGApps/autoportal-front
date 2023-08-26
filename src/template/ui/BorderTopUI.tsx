import React from 'react';
import styled from 'styled-components/native';
import {MainContainer} from '../containers/MainContainer';
import {ColorsUI} from '../styles/ColorUI';

interface BorderTopUIProps {
  $colorLine?: string;
}

export const BorderTopUI = styled(MainContainer)<BorderTopUIProps>`
  border-top-width: 1px;
  border-top-color: ${({$colorLine}) => $colorLine || ColorsUI.gray.line};
`;
