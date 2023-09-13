import React, {useEffect} from 'react';
import {ColorsUI} from '../../template/styles/ColorUI';
import {Loader} from '../../components/Loader';
import {CenterContainerFlex} from '../../template/containers/CenterContainer';
import {StatusBar} from 'react-native';
import {useAppDispatch} from '../../settings/redux/hooks';
import {initApp} from '../../modules/auth/thunks/init.thunk';

export const InitScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(initApp());
    })();
  }, []);

  return (
    <CenterContainerFlex $bg={ColorsUI.white}>
      <StatusBar barStyle={'dark-content'} backgroundColor={ColorsUI.white} />
      <Loader />
    </CenterContainerFlex>
  );
};
