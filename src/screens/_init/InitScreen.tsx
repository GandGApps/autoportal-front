import React, {useEffect} from 'react';
import {ColorsUI} from '../../template/styles/ColorUI';
import Navigation from '../../routes/navigation/Navigation';
import {Screens} from '../../routes/models/Screens';
import {Loader} from '../../components/Loader';
import {CenterContainerFlex} from '../../template/containers/CenterContainer';

export const InitScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      Navigation.replace(Screens.CATEGORIES);
    }, 2000);
  }, []);
  return (
    <CenterContainerFlex $bg={ColorsUI.white}>
      <Loader />
    </CenterContainerFlex>
  );
};
