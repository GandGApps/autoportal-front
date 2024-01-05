import React, {useState} from 'react';
import {TypeService} from '../../../../modules/organizations/models/TypeService';
import {BorderTopUI} from '../../../../template/ui/BorderTopUI';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {OrgService} from './_Service';
import {View} from 'react-native';

interface OrgServicesProps {
  services: TypeService[];
}

export const OrgServices = ({services}: OrgServicesProps) => {
  const [isMore, setIsMore] = useState(false);
  return (
    <BorderTopUI $bg={ColorsUI.gray.bg} $pv={20}>
      <MainContainer $ph={20}>
        <TextUI $mb={20} ag={Ag['600_16']}>
          {'Услуги'}
        </TextUI>
      </MainContainer>

      {services?.map((serviceData, idx) => (
        <OrgService
          key={`org-${serviceData.service._id}`}
          service={serviceData.service}
          subService={serviceData.ext_services}
        />
      ))}
    </BorderTopUI>
  );
};
