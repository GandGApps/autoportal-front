import React from 'react';
import {MainContainer} from '../template/containers/MainContainer';
import {ColorsUI} from '../template/styles/ColorUI';
import {RowContainerBeetwenEnd} from '../template/containers/RowContainer';
import {Ag, TextUI} from '../template/ui/TextUI';
import styled from 'styled-components/native';
import {FontHelper} from '../template/helper/FontHelper';

interface TextareaProps {
  value: string;
  onChangeText: (value: string) => void;
}

export const Textarea = (props: TextareaProps) => {
  return (
    <MainContainer
      $heightPX={150}
      $ph={15}
      $pt={15}
      $pb={5}
      $bg={ColorsUI.white}
      $br={13}
      $borderColor={ColorsUI.black}>
      <MainContainer $isFlex>
        <TextInputStyled
          placeholder={'Опишите ваше акционное предложение'}
          editable
          multiline
          maxLength={255}
          onChangeText={props.onChangeText}
          value={props.value}
        />
      </MainContainer>
      <RowContainerBeetwenEnd>
        <TextUI ag={Ag['400_16']}>{`${props.value.length}/255`}</TextUI>
      </RowContainerBeetwenEnd>
    </MainContainer>
  );
};

const TextInputStyled = styled.TextInput`
  flex: 1;
  font-family: ${FontHelper.getTextFamily(400)};
  font-size: 16px;
  line-height: 19.5px;
`;
