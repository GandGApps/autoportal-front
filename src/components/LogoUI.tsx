import React from 'react';
import {MainContainer} from '../template/containers/MainContainer';
import {ContainerProps} from '../template/ui-types/UITypes';
import {NoLogoIcon} from '../template/icons/NoLogoIcon';
import {ImageUI} from '../template/ui/ImageUI';

interface LogoUIProps extends ContainerProps {
  url?: string;
  size?: number;
}

export const LogoUI = (props: LogoUIProps) => {
  return (
    <MainContainer
      {...props}
      $heightPX={props.size || 70}
      $widthPX={props.size || 70}>
      {props.url ? (
        <ImageUI source={{uri: props.url}} resizeMode={'contain'} />
      ) : (
        <NoLogoIcon size={props.size} />
      )}
    </MainContainer>
  );
};
