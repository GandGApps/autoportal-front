import React from 'react';
import {LefiIcon} from '../icons/LefiIcon';
import styled from 'styled-components/native';
import {ContainerProps} from '../ui-types/UITypes';
import {defaultContainerCSS} from '../containers/MainContainer';
import Navigation from '../../routes/navigation/Navigation';

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
    <BackBtnStyles $pr={10} $pv={5} {...props} onPress={handleBackNavigation}>
      <LefiIcon color={props.color} />
    </BackBtnStyles>
  );
};

const BackBtnStyles = styled.TouchableOpacity<ContainerProps>`
  ${defaultContainerCSS}
`;
