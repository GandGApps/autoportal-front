import React from 'react';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {RowContainer} from '../../../../template/containers/RowContainer';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {WhatsAppIcon} from '../../../../template/icons/WhatsAppIcon';
import {Linking} from 'react-native';

interface Props {
  phone: string;
}

export const OrganizationWhatsApp = ({phone}: Props) => {
  return (
    <ViewPress
      activeOpacity={0.8}
      onPress={() => {
        Linking.openURL(`https://wa.me/${phone.replace('+', '')}`);
      }}>
      <RowContainer $bg={ColorsUI.whatsapp} $pv={10} $ph={10} $br={5}>
        <TextUI $mr={5} ag={Ag['400_12']} color={ColorsUI.white}>
          {'WhatsApp'}
        </TextUI>
        <WhatsAppIcon />
      </RowContainer>
    </ViewPress>
  );
};
