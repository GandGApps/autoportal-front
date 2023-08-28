import React from 'react';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {InputUI} from '../../../../template/ui/InputUI';
import {InputSelectUI} from '../../../../template/ui/InputSelectUI';
import {DownIcon} from '../../../../template/icons/DownIcon';

interface CreateOrganizationProps {
  nameValue: string;
  categoryValue?: string;

  onChangeName: (value: string) => void;
  onChangeService: () => void;
  onChangeBrandsCars: () => void;
}

export const CreateOrganization = (props: CreateOrganizationProps) => {
  return (
    <MainContainer $ph={20} $pb={50}>
      <TextUI $mb={15} ag={Ag['600_16']}>
        {'Организация'}
      </TextUI>

      <InputUI
        containerStyles={{
          $mb: 10,
        }}
        placeholder={'Название организации'}
        value={props.nameValue}
        onChangeText={props.onChangeName}
      />
      <InputSelectUI
        containerStyles={{
          $mb: 10,
        }}
        placeholder={'Категория организации'}
        value={props.categoryValue}
        rightIcon={<DownIcon />}
      />
      <InputSelectUI
        containerStyles={{
          $mb: 10,
        }}
        value={'Вид услуги'}
        rightIcon={<DownIcon />}
        onPress={props.onChangeService}
      />
      <InputSelectUI
        containerStyles={{
          $mb: 10,
        }}
        value={'Марки обслужив. автомобилей'}
        rightIcon={<DownIcon />}
        onPress={props.onChangeBrandsCars}
      />
    </MainContainer>
  );
};
