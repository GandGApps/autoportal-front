import React from 'react';
import {OrganizationList} from '../../../modules/organizations/models/OrganizationList';
import {Promotion} from '../../../modules/organizations/models/Promotion';
import {BorderTopUI} from '../../../template/ui/BorderTopUI';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {ViewPress} from '../../../template/containers/ViewPress';
import {
  RowContainer,
  RowContainerBeetwenStart,
} from '../../../template/containers/RowContainer';
import {LogoUI} from '../../../components/LogoUI';
import {MainContainer} from '../../../template/containers/MainContainer';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {LocationIcon} from '../../../template/icons/LocationIcon';
import {RatingCount} from '../../../components/RatingCount';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';

interface _Props {
  organization: OrganizationList;
  promotion: Promotion;
}

export const PromoOrganization = ({organization, promotion}: _Props) => {
  const handleGoToOrganization = () => {
    Navigation.navigate(Screens.ORGANIZATION, {
      _id: organization._id,
    });
  };

  return (
    <BorderTopUI $bg={ColorsUI.blue} $pv={20} $ph={20}>
      <ViewPress onPress={handleGoToOrganization}>
        <RowContainerBeetwenStart $mb={20}>
          <RowContainer>
            <LogoUI size={45} url={organization.logo} />

            <MainContainer $ml={10}>
              <TextUI $mb={5} ag={Ag['700_14']}>
                {organization.name}
              </TextUI>

              <RowContainer>
                <LocationIcon />

                <MainContainer $ml={5}>
                  <TextUI ag={Ag['500_14']}>{organization.address}</TextUI>
                </MainContainer>
              </RowContainer>
            </MainContainer>
          </RowContainer>

          <MainContainer>
            <TextUI $mb={5} ag={Ag['400_14']}>
              {organization.categoryName}
            </TextUI>
            <RatingCount rating={organization.rating!} />
          </MainContainer>
        </RowContainerBeetwenStart>

        <TextUI $mb={20} ag={Ag['400_16']}>
          {promotion.description}
        </TextUI>

        <TextUI ag={Ag['400_14']}>
          {`Действует с ${promotion.startPromo} по ${promotion.endPromo}`}
        </TextUI>
      </ViewPress>
    </BorderTopUI>
  );
};
