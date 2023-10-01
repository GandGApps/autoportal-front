import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {CenterContainer} from '../containers/CenterContainer';
import {ColorsUI} from '../styles/ColorUI';
import {Image} from 'react-native';

interface IconContainerUIProps {
  img?: string;
}

export const IconContainerUI = (props: IconContainerUIProps) => {
  return (
    <IconContainerUIProps $widthPX={50} $heightPX={50}>
      {props.img && (
        <Image
          width={40}
          height={40}
          resizeMode={'contain'}
          source={{uri: props.img}}
        />
      )}
    </IconContainerUIProps>
  );
};

const IconContainerUIProps = styled(CenterContainer)`
  border-radius: 50px;
  background-color: ${ColorsUI.black};
`;
