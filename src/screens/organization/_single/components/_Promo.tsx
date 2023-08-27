import React from 'react';
import {BorderTopUI} from '../../../../template/ui/BorderTopUI';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {Ag, TextUI} from '../../../../template/ui/TextUI';

interface OrganizationPromoProps {
  description: string;
  startPromo: string;
  endPromo: string;
}

export const OrganizationPromo = (props: OrganizationPromoProps) => {
  return (
    <BorderTopUI>
      <MainContainer $bg={ColorsUI.blue} $ph={20} $pv={20}>
        <TextUI $mb={15} ag={Ag['600_16']}>
          {'Акция'}
        </TextUI>
        <TextUI $mb={15} ag={Ag['400_16']}>
          {props.description}
        </TextUI>
        <TextUI ag={Ag['400_14']}>
          {`Действует с ${props.startPromo} по ${props.endPromo}`}
        </TextUI>
      </MainContainer>
    </BorderTopUI>
  );
};
