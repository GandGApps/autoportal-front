import React, {useState} from 'react';
import {BorderTopUI} from '../../../../template/ui/BorderTopUI';
import {
  RowContainer,
  RowContainerBeetwen,
} from '../../../../template/containers/RowContainer';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {OrganizationWhatsApp} from './_WhatsApp';
import {OrgContactInfoRow} from './_ContactInfoRow';
import {LocationIcon} from '../../../../template/icons/LocationIcon';
import {PhoneIcon} from '../../../../template/icons/PhoneIcon';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {Nullable} from '../../../../settings/types/BaseTypes';
import {
  ContactInfoModel,
  EmployeerModel,
} from '../../../../modules/organizations/types/OrganizationTypes';
import {MaskHelper} from '../../../../helper/MaskHelper';
import {MainContainer} from '../../../../template/containers/MainContainer';

interface ContactInfoContentProps {
  contactInfo: Nullable<ContactInfoModel>;
  city: string;
  address: string;
  employeers?: EmployeerModel[];
}

export const ContactInfoContent = (props: ContactInfoContentProps) => {
  const [isMore, setIsMore] = useState(false);

  return (
    <BorderTopUI $ph={20} $pt={10} $pb={20}>
      <RowContainerBeetwen $mb={10}>
        <TextUI ag={Ag['600_16']}>{'Контактная информация'}</TextUI>

        {props.contactInfo?.whatsApp ? <OrganizationWhatsApp /> : null}
      </RowContainerBeetwen>

      <OrgContactInfoRow icon={<LocationIcon />} text={`г. ${props.city}`} />

      <OrgContactInfoRow icon={<LocationIcon />} text={`${props.address}`} />

      {props.contactInfo?.mainPhone ? (
        <OrgContactInfoRow
          icon={<PhoneIcon size={13} />}
          text={MaskHelper.formatPhoneNumber(props.contactInfo.mainPhone) || ''}
        />
      ) : null}

      {isMore ? (
        <MainContainer $mt={10}>
          {props.employeers?.map(employeer => (
            <MainContainer key={`org-emp-${employeer._id}`} $mb={20}>
              <TextUI $mb={5} ag={Ag['600_12']}>
                {`${employeer.position} | ${employeer.name}`}
              </TextUI>
              <RowContainer>
                <MainContainer $mr={5}>
                  <PhoneIcon size={14} />
                </MainContainer>

                <TextUI ag={Ag['400_16']}>
                  {`${MaskHelper.formatPhoneNumber(employeer.phone)}`}
                </TextUI>
              </RowContainer>
            </MainContainer>
          ))}
        </MainContainer>
      ) : null}

      {props.employeers?.length ? (
        <ViewPress $mt={10} onPress={() => setIsMore(!isMore)}>
          <TextUI ag={Ag['600_16']} color={ColorsUI.green}>
            {isMore ? 'Свернуть' : 'Подробнее'}
          </TextUI>
        </ViewPress>
      ) : null}
    </BorderTopUI>
  );
};
