import React from 'react';
import {LefiIcon} from '../icons/LefiIcon';
import styled from 'styled-components/native';
import {ContainerProps} from '../ui-types/UITypes';
import {defaultContainerCSS} from '../containers/MainContainer';
import Navigation from '../../routes/navigation/Navigation';

export const BackBtn = (props: ContainerProps) => {
  const handleBackNavigation = () => {
    Navigation.pop();
  };

  return (
    <BackBtnStyles $pr={10} $pv={5} {...props} onPress={handleBackNavigation}>
      <LefiIcon />
    </BackBtnStyles>
  );
};

const BackBtnStyles = styled.TouchableOpacity<ContainerProps>`
  ${defaultContainerCSS}
`;
