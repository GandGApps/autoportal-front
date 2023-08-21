import styled from 'styled-components/native';
import {defaultContainerCSS} from './MainContainer';
import {ContainerProps} from '../ui-types/UITypes';

export const ViewPress = styled.TouchableOpacity<ContainerProps>`
  ${defaultContainerCSS}
`;

export const ViewFlexPress = styled(ViewPress)`
  flex: 1;
`;
