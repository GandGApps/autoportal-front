import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';
import {ColorsUI} from '../template/styles/ColorUI';

export const Loader = (props: ActivityIndicatorProps) => {
  return <ActivityIndicator size={'large'} color={ColorsUI.black} {...props} />;
};
