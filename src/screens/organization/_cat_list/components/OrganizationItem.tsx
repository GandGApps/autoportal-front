import React from 'react';
import {BorderTopUI} from '../../../../template/ui/BorderTopUI';
import {TouchableOpacity} from 'react-native';
import {
  RowContainer,
  RowContainerEnd,
} from '../../../../template/containers/RowContainer';
import {LogoUI} from '../../../../components/LogoUI';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {LocationIcon} from '../../../../template/icons/LocationIcon';
import {AbsoluteContainer} from '../../../../template/containers/AbsoluteContainer';
import {StarIcon} from '../../../../template/icons/StarIcon';
import {OrganizationList} from '../../../../modules/organizations/models/OrganizationList';
import Navigation from '../../../../routes/navigation/Navigation';
import {Screens} from '../../../../routes/models/Screens';

interface OrganizationItemProps {
  item: OrganizationList;
}

export const OrganizationItem = ({item}: OrganizationItemProps) => {
  const handleGoToOrganization = () => {
    Navigation.navigate(Screens.ORGANIZATION, {
      _id: item._id,
    });
  };

  return (
    <BorderTopUI>
      <TouchableOpacity onPress={handleGoToOrganization}>
        <RowContainer $pv={20} $ph={20}>
          <LogoUI url={item.logo} $mr={10} />

          <MainContainer>
            <TextUI $mb={5} ag={Ag['700_14']}>
              {item.name}
            </TextUI>

            <RowContainer>
              <MainContainer $mr={5}>
                <LocationIcon />
              </MainContainer>
              <TextUI ag={Ag['400_16']}>{item.address}</TextUI>
            </RowContainer>
          </MainContainer>
        </RowContainer>
      </TouchableOpacity>

      <AbsoluteContainer $top={5} $right={20}>
        <TextUI ag={Ag['400_12']}>{item.categoryName}</TextUI>
      </AbsoluteContainer>

      <AbsoluteContainer $bottom={5} $right={20}>
        <RowContainerEnd>
          <MainContainer $mr={3}>
            <StarIcon />
          </MainContainer>
          <TextUI ag={Ag['400_12']}>
            {`${item.rating || 0} (${item.countReviews || 0})`}
          </TextUI>
        </RowContainerEnd>
      </AbsoluteContainer>
    </BorderTopUI>
  );
};
