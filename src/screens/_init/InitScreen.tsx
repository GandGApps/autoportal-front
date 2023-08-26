import React, {useEffect} from 'react';
import {ColorsUI} from '../../template/styles/ColorUI';
import Navigation from '../../routes/navigation/Navigation';
import {Screens} from '../../routes/models/Screens';
import {Loader} from '../../components/Loader';
import {CenterContainerFlex} from '../../template/containers/CenterContainer';
import {StatusBar} from 'react-native';

export const InitScreen = () => {
  useEffect(() => {
    Navigation.replace(Screens.CATEGORIES);
  }, []);
  return (
    <CenterContainerFlex $bg={ColorsUI.white}>
      <StatusBar barStyle={'dark-content'} backgroundColor={ColorsUI.white} />
      <Loader />
    </CenterContainerFlex>
  );
};
