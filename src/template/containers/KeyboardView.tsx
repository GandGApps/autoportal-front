import styled from 'styled-components/native';
import {ContainerProps} from '../ui-types/UITypes';
import {defaultContainerCSS} from './MainContainer';

export const KeyboardView = styled.KeyboardAvoidingView<ContainerProps>`
  ${defaultContainerCSS}
`;
