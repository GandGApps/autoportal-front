import styled from 'styled-components/native';
import {MainContainer} from './MainContainer';

export const RowContainer = styled(MainContainer)`
  flex-direction: row;
  align-items: center;
`;

export const RowContainerStartFlex = styled(RowContainer)`
  flex: 1;
  align-items: start;
`;

export const RowContainerEnd = styled(RowContainer)`
  align-items: end;
`;

export const RowContainerJustEnd = styled(RowContainer)`
  justify-content: flex-end;
`;

export const RowContainerCenter = styled(RowContainer)`
  justify-content: center;
`;

export const RowContainerBeetwen = styled(RowContainer)`
  justify-content: space-between;
  align-items: center;
`;

export const RowContainerBeetwenStart = styled(RowContainerBeetwen)`
  align-items: start;
`;

export const RowContainerBeetwenFlex = styled(RowContainerBeetwen)`
  flex: 1;
`;

export const RowContainerBeetwenEnd = styled(RowContainerBeetwen)`
  align-items: end;
`;

export const RowContainerBeetwenEndFlex = styled(RowContainerBeetwenEnd)`
  flex: 1;
`;

export const RowContainerStart = styled(RowContainer)`
  align-items: start;
`;
