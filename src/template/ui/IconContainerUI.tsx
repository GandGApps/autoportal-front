import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {CenterContainer} from '../containers/CenterContainer';
import {ColorsUI} from '../styles/ColorUI';

interface IconContainerUIProps {
  icon?: ReactNode;
}

export const IconContainerUI = (props: IconContainerUIProps) => {
  return (
    <IconContainerUIProps $widthPX={50} $heightPX={50}>
      {props.icon || null}
    </IconContainerUIProps>
  );
};

const IconContainerUIProps = styled(CenterContainer)`
  border-radius: 50px;
  background-color: ${ColorsUI.black};
`;
