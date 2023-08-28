import styled from 'styled-components/native';
import {ContainerProps} from '../ui-types/UITypes';
import {defaultContainerCSS} from '../containers/MainContainer';

export const ImageUI = styled.Image<ContainerProps>`
  ${defaultContainerCSS}
`;
