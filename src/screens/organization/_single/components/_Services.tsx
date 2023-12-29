import React, {useState} from 'react';
import {TypeService} from '../../../../modules/organizations/models/TypeService';
import {BorderTopUI} from '../../../../template/ui/BorderTopUI';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {OrgService} from './_Service';

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

      {services.map((service, idx) =>
        idx < 3 ? (
          <OrgService key={`org-${service._id}`} service={service} />
        ) : null,
      )}

      {isMore ? (
        <>
          {services.map((service, idx) =>
            idx > 2 ? (
              <OrgService key={`org-${service._id}`} service={service} />
            ) : null,
          )}
        </>
      ) : null}

      {services.length > 3 ? (
        <ViewPress $ph={20} $mt={20} onPress={() => setIsMore(!isMore)}>
          <TextUI ag={Ag['600_16']} color={ColorsUI.green}>
            {!isMore ? 'Смотреть весь список' : 'Свернуть список'}
          </TextUI>
        </ViewPress>
      ) : null}
    </BorderTopUI>
  );
};
