import React from 'react';
import {MainContainer} from '../template/containers/MainContainer';
import {ContainerProps} from '../template/ui-types/UITypes';
import {NoLogoIcon} from '../template/icons/NoLogoIcon';
import {ImageUI} from '../template/ui/ImageUI';

interface LogoUIProps extends ContainerProps {
  url: string;
}

export const LogoUI = (props: LogoUIProps) => {
  return (
    <MainContainer {...props} $heightPX={70} $widthPX={70}>
      {props.url ? (
        <ImageUI source={{uri: props.url}} resizeMode={'contain'} />
      ) : (
        <NoLogoIcon />
      )}
    </MainContainer>
  );
};
