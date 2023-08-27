import React from 'react';
import {LefiIcon} from '../icons/LefiIcon';
import {ContainerProps} from '../ui-types/UITypes';
import Navigation from '../../routes/navigation/Navigation';
import {ViewPress} from '../containers/ViewPress';

interface BackBtnProps extends ContainerProps {
  callback?: () => void;
  color?: string;
}

export const BackBtn = (props: BackBtnProps) => {
  const handleBackNavigation = () => {
    if (props.callback) {
      props.callback();
    }

    Navigation.pop();
  };

  return (
    <ViewPress $pr={10} $pv={5} {...props} onPress={handleBackNavigation}>
      <LefiIcon color={props.color} />
    </ViewPress>
  );
};
