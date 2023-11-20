import React, {useState} from 'react';
import {BorderTopUI} from '../../../../template/ui/BorderTopUI';
import {UnitsFilter} from '../../../../modules/organizations/types/OrganizationTypes';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {ColorsUI} from '../../../../template/styles/ColorUI';

interface OrgCarsBrandsProps {
  carsBrands: UnitsFilter[];
}

export const OrgCarsBrands = ({carsBrands}: OrgCarsBrandsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <BorderTopUI $ph={20} $pv={20}>
      <TextUI ag={Ag['600_16']} $mb={15}>
        {'Обслуживаемые марки авто'}
      </TextUI>
      {carsBrands.slice(0, 3).map(brand => (
        <TextUI $mb={5} key={`org-brand-${brand._id}`} ag={Ag['400_16']}>
          {brand.title}
        </TextUI>
      ))}
      {carsBrands.length > 3 &&
        isOpen &&
        carsBrands.slice(3).map(brand => (
          <TextUI $mb={5} key={`org-brand-${brand._id}`} ag={Ag['400_16']}>
            {brand.title}
          </TextUI>
        ))}
      <ViewPress $mt={10} onPress={() => setIsOpen(!isOpen)}>
        <TextUI ag={Ag['500_14']} color={ColorsUI.green}>
          {isOpen ? 'Скрыть' : 'Развернуть'}
        </TextUI>
      </ViewPress>
    </BorderTopUI>
  );
};
