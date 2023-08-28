import React from 'react';
import {InputUI, InputUIProps} from './InputUI';
import {ContainerProps} from '../ui-types/UITypes';
import styled from 'styled-components/native';
import {ButtonWidthCSS} from './ButtonUI';

interface InputSelectUIProps extends InputUIProps {
  onPress?: () => void;
  btnStyled?: ContainerProps;
}

export const InputSelectUI = (props: InputSelectUIProps) => {
  return (
    <InputSelectStyled {...props.btnStyled} onPress={props.onPress}>
      <InputUI {...props} isSelect />
    </InputSelectStyled>
  );
};

const InputSelectStyled = styled.TouchableOpacity<ContainerProps>`
  ${ButtonWidthCSS}
`;
