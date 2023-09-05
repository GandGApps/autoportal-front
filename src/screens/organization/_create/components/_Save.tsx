import React from 'react';
import {BorderTopUI} from '../../../../template/ui/BorderTopUI';
import {ButtonUI} from '../../../../template/ui/ButtonUI';

interface CreateSaveProps {
  isEdit?: boolean;
  onRemovePress: () => void;
  onSavePress: () => void;
}

export const CreateSave = (props: CreateSaveProps) => {
  return (
    <BorderTopUI $pt={25} $pb={25} $ph={20}>
      {props.isEdit ? (
        <ButtonUI
          $mb={10}
          $type={'border'}
          title={'Удалить организацию'}
          onPress={props.onRemovePress}
        />
      ) : null}

      <ButtonUI title={'Сохранить'} onPress={props.onSavePress} />
    </BorderTopUI>
  );
};
