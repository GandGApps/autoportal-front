import React from 'react';
import styled from 'styled-components/native';
import {MainContainer} from '../containers/MainContainer';
import {ColorsUI} from '../styles/ColorUI';

export const BorderTopUI = styled(MainContainer)`
  border-top-width: 1px;
  border-top-color: ${ColorsUI.gray.line};
`;
