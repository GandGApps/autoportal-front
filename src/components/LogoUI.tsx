import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {MainContainer} from '../template/containers/MainContainer';
import {ContainerProps} from '../template/ui-types/UITypes';
import {NoLogoIcon} from '../template/icons/NoLogoIcon';

interface LogoUIProps extends ContainerProps {
  url: string;
}

export const LogoUI = (props: LogoUIProps) => {
  return (
    <MainContainer {...props} $heightPX={70} $widthPX={70}>
      {props.url ? (
        <Image style={styles.image} source={{uri: props.url}} />
      ) : (
        <NoLogoIcon />
      )}
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
