import React, {useEffect} from 'react';
import {ColorsUI} from '../../template/styles/ColorUI';
import Navigation from '../../routes/navigation/Navigation';
import {Screens} from '../../routes/models/Screens';
import {Loader} from '../../components/Loader';
import {CenterContainerFlex} from '../../template/containers/CenterContainer';
import {StatusBar} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../settings/redux/hooks';
import {selectAuthValues} from '../../modules/auth/AuthSlice';
import {initApp} from '../../modules/auth/thunks/init.thunk';

export const InitScreen = () => {
  const {isAuth} = useAppSelector(selectAuthValues);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(initApp());

      if (isAuth) {
        Navigation.replace(Screens.CATEGORIES);
      } else {
        Navigation.replace(Screens.WELCOME);
      }
    })();
  }, []);
  return (
    <CenterContainerFlex $bg={ColorsUI.white}>
      <StatusBar barStyle={'dark-content'} backgroundColor={ColorsUI.white} />
      <Loader />
    </CenterContainerFlex>
  );
};
