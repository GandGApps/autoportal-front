import styled from 'styled-components';
import {MainContainer} from './MainContainer';

export const ColumnContainerFlex = styled(MainContainer)`
  flex: 1;
`;

export const ColumnContainerFlexEnd = styled(ColumnContainerFlex)`
  justify-content: flex-end;
`;

export const ColumnContainerFlexCenter = styled(ColumnContainerFlex)`
  justify-content: center;
`;

export const ColumnContainerBetween = styled(MainContainer)`
  justify-content: space-between;
`;

export const ColumnContainerBetweenFlex = styled(ColumnContainerBetween)`
  flex: 1;
`;

export const ColumnContainerBetweenAlignCenter = styled(
  ColumnContainerBetweenFlex,
)`
  align-items: center;
`;
