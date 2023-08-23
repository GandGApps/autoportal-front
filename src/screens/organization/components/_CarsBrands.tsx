import React from 'react';
import {BorderTopUI} from '../../../template/ui/BorderTopUI';
import {UnitsFilter} from '../../../modules/organizations/types/OrganizationTypes';
import {Ag, TextUI} from '../../../template/ui/TextUI';

interface OrgCarsBrandsProps {
  carsBrands: UnitsFilter[];
}

export const OrgCarsBrands = ({carsBrands}: OrgCarsBrandsProps) => {
  return (
    <BorderTopUI $ph={20} $pv={20}>
      <TextUI ag={Ag['600_16']} $mb={15}>
        {'Обслуживаемые марки авто'}
      </TextUI>
      {carsBrands.map(brand => (
        <TextUI $mb={5} key={`org-brand-${brand._id}`} ag={Ag['400_16']}>
          {brand.title}
        </TextUI>
      ))}
    </BorderTopUI>
  );
};
