import React from 'react';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {InputUI} from '../../../../template/ui/InputUI';
import {ContainerProps} from '../../../../template/ui-types/UITypes';

interface EmployeersInfoProps extends ContainerProps {
  firstValue: string;
  secondValue: string;
  thirdValue: string;

  onChangeFirst: (value: string) => void;
  onChangeSecond: (value: string) => void;
  onChangeThird: (value: string) => void;
}

export const EmployeersInfo = (props: EmployeersInfoProps) => {
  return (
    <MainContainer {...props}>
      <InputUI
        containerStyles={{$mb: 10}}
        placeholder={'Должность'}
        value={props.firstValue}
        onChangeText={props.onChangeFirst}
      />
      <InputUI
        containerStyles={{$mb: 10}}
        placeholder={'Имя мастера'}
        value={props.secondValue}
        onChangeText={props.onChangeSecond}
      />
      <InputUI
        placeholder={'Телефон мастера'}
        value={props.thirdValue}
        onChangeText={props.onChangeThird}
        keyboardType={'number-pad'}
        maxLength={18}
      />
    </MainContainer>
  );
};
