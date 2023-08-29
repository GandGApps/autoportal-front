import React from 'react';
import {BorderTopUI} from '../../../../template/ui/BorderTopUI';
import {ButtonUI} from '../../../../template/ui/ButtonUI';

interface CreateSaveProps {
  onSavePress: () => void;
}

export const CreateSave = (props: CreateSaveProps) => {
  return (
    <BorderTopUI $pt={25} $pb={25} $ph={20}>
      <ButtonUI title={'Сохранить'} onPress={props.onSavePress} />
    </BorderTopUI>
  );
};
