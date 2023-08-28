import React from 'react';
import {BorderTopUI} from '../../../../template/ui/BorderTopUI';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {Textarea} from '../../../../components/Textarea';

interface CreateDescriptionProps {
  value: string;
  onChangeText: (value: string) => void;
}

export const CreateDescription = (props: CreateDescriptionProps) => {
  return (
    <BorderTopUI $ph={20} $pt={25} $pb={50} $bg={ColorsUI.gray.second}>
      <TextUI $mb={25} ag={Ag['600_16']}>
        {'Краткое описание организации'}
      </TextUI>

      <Textarea
        placeholder={'Описание'}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </BorderTopUI>
  );
};
