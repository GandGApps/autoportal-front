import React, {FC, Fragment, RefObject} from 'react';
import {FlatList, Linking, StyleSheet, View} from 'react-native';
import {IHandles} from 'react-native-modalize/lib/options';
import {SwipeableModal} from '../../../../components/SwipbleModal';
import {MaskHelper} from '../../../../helper/MaskHelper';
import {EmployeerModel} from '../../../../modules/organizations/types/OrganizationTypes';
import {CenterContainer} from '../../../../template/containers/CenterContainer';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {RowContainer} from '../../../../template/containers/RowContainer';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {PhoneIcon} from '../../../../template/icons/PhoneIcon';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {Insets} from '../../../../template/styles/Insets';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {OrganizationWhatsApp} from './_WhatsApp';

interface CompProps {
  employeers: EmployeerModel[];
  modalizeRef: RefObject<IHandles>;
  mainPhone?: string;
  whatsApp?: string;
}

export const ContactModal: FC<CompProps> = function ContactModal(props) {
  // Linking.openURL(`tel:${organization.mainPhone}`);

  const formatPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/\D/g, '');
  };

  return (
    <SwipeableModal modalizeRef={props.modalizeRef}>
      <View style={{paddingBottom: Insets.bottom}}>
        {!!props.whatsApp && (
          <Fragment>
            <TextUI $mb={10} ag={Ag['500_14']} $align={'center'}>
              {'Написать нам на WhatsApp'}
            </TextUI>
            <CenterContainer $mb={20}>
              <OrganizationWhatsApp phone={props.whatsApp} />
            </CenterContainer>
          </Fragment>
        )}

        <CenterContainer>
          {!!props.mainPhone && (
            <MainContainer $mb={20} $borderBottom={ColorsUI.gray.disabled}>
              <TextUI $mb={10} ag={Ag['500_14']} $align={'center'}>
                {'Основной номер'}
              </TextUI>
              <ViewPress
                onPress={() => {
                  Linking.openURL(`tel:${props.mainPhone}`);
                }}>
                <RowContainer $mb={15}>
                  <PhoneIcon color={ColorsUI.black} size={24} />
                  <TextUI $ml={10} ag={Ag['600_16']}>
                    {MaskHelper.formatPhoneNumber(props.mainPhone)}
                  </TextUI>
                </RowContainer>
              </ViewPress>
            </MainContainer>
          )}

          <FlatList
            data={props.employeers}
            renderItem={({item, index}) => (
              <MainContainer
                $mt={index ? 20 : undefined}
                $borderBottom={ColorsUI.gray.disabled}>
                <TextUI $mb={10} ag={Ag['500_14']} $align={'center'}>
                  {`${item.position} | ${item.name}`}
                </TextUI>
                <ViewPress
                  onPress={() => {
                    const formattedPhone = formatPhoneNumber(item.phone);
                    Linking.openURL(`tel:+${formattedPhone}`);
                  }}>
                  <RowContainer $mb={15}>
                    <PhoneIcon color={ColorsUI.black} size={24} />
                    <TextUI $ml={10} ag={Ag['600_16']}>
                      {MaskHelper.formatPhoneNumber(item.phone)}
                    </TextUI>
                  </RowContainer>
                </ViewPress>
              </MainContainer>
            )}
          />
        </CenterContainer>
      </View>
    </SwipeableModal>
  );
};

const compStyles = StyleSheet.create({});
