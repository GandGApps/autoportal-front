import styled from 'styled-components/native';
import {ContainerProps} from '../ui-types/UITypes';
import {defaultContainerCSS} from './MainContainer';

export const ScrollViewScreen = styled.ScrollView<ContainerProps>`
  ${defaultContainerCSS}

  flex: 1
`;
