import React from 'react';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {InputSelectUI} from '../../../../template/ui/InputSelectUI';
import {DownIcon} from '../../../../template/icons/DownIcon';
import {InputUI} from '../../../../template/ui/InputUI';
import {MaskHelper} from '../../../../helper/MaskHelper';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {BorderTopUI} from '../../../../template/ui/BorderTopUI';
import {ColorsUI} from '../../../../template/styles/ColorUI';

interface CreateContactInfoProps {
  city: string;
  onPressCity: () => void;

  address: string;
  onChangeAddress: (value: string) => void;

  mainPhone: string;
  onChangePhone: (value: string) => void;

  whatsApp: string;
  onChangeWhatsapp: (value: string) => void;
}

export const CreateContactInfo = (props: CreateContactInfoProps) => {
  return (
    <>
      <BorderTopUI $pt={20} $pb={50} $ph={20} $bg={ColorsUI.gray.second}>
        <TextUI $mb={25} ag={Ag['600_16']}>
          {'Контактная информация'}
        </TextUI>

        <InputSelectUI
          containerStyles={{
            $mb: 10,
            $bg: ColorsUI.white,
          }}
          placeholder={'Местоположение'}
          value={props.city}
          rightIcon={<DownIcon />}
        />

        <InputUI
          containerStyles={{
            $mb: 10,
            $bg: ColorsUI.white,
          }}
          placeholder={'Адрес'}
          value={props.address}
          onChangeText={props.onChangeAddress}
        />

        <InputUI
          containerStyles={{
            $mb: 10,
            $bg: ColorsUI.white,
          }}
          placeholder={'Основной телефон'}
          value={MaskHelper.formatPhoneNumber(props.mainPhone)}
          onChangeText={props.onChangePhone}
          maxLength={18}
          keyboardType={'number-pad'}
        />

        <InputUI
          containerStyles={{
            $bg: ColorsUI.white,
          }}
          placeholder={'Телефон Whatsapp'}
          value={MaskHelper.formatPhoneNumber(props.whatsApp)}
          onChangeText={props.onChangeWhatsapp}
          maxLength={18}
          keyboardType={'number-pad'}
        />
      </BorderTopUI>
    </>
  );
};
