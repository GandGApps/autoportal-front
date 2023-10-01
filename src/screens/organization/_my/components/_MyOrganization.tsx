import React from 'react';
import {BorderTopUI} from '../../../../template/ui/BorderTopUI';
import {TouchableOpacity} from 'react-native';
import {
  RowContainer,
  RowContainerBeetwen,
  RowContainerBeetwenEnd,
} from '../../../../template/containers/RowContainer';
import {LogoUI} from '../../../../components/LogoUI';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {LocationIcon} from '../../../../template/icons/LocationIcon';
import {StarIcon} from '../../../../template/icons/StarIcon';
import Navigation from '../../../../routes/navigation/Navigation';
import {Screens} from '../../../../routes/models/Screens';
import {PersonalOrganizations} from '../../../../modules/organizations/models/PersonalOrganizations';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {HearthIcon} from '../../../../template/icons/HearthIcon';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {RightIcon} from '../../../../template/icons/RightIcon';
import {TelegramIcon} from '../../../../template/icons/TelegramIcon';
import {UnderLineText} from '../../../../components/UnderLineText';

interface OrganizationItemProps {
  item: PersonalOrganizations;
}

export const MyOrganization = ({item}: OrganizationItemProps) => {
  const handleGoToScreen = (screen: string) => {
    Navigation.navigate(screen, {
      _id: item._id,
    });
  };

  const handleGoToPromo = () => {
    Navigation.navigate(Screens.ORGANIZATION_PROMO, {
      promo: item.promo && item.promo,
      logo: item.logo && item.logo,
      name: item.name,
    });
  };

  return (
    <BorderTopUI>
      <MainContainer $pv={10} $ph={20}>
        <RowContainerBeetwen $mb={10}>
          <TextUI
            ag={Ag['400_14']}
            color={item.isSubscribe ? ColorsUI.green : ColorsUI.red}>
            {item.isSubscribe ? 'Подписка активна' : 'Подписка неактивна'}
          </TextUI>

          <TextUI ag={Ag['400_14']}>{item.categoryName}</TextUI>
        </RowContainerBeetwen>

        <TouchableOpacity
          onPress={() => handleGoToScreen(Screens.ORGANIZATION)}>
          <RowContainerBeetwen $mb={10}>
            <RowContainer>
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

            <RightIcon />
          </RowContainerBeetwen>
        </TouchableOpacity>

        <RowContainer $mb={10}>
          <StarIcon />
          <TextUI ag={Ag['400_14']}>
            {`${item.rating} (${item.countReviews || 0})`}
          </TextUI>
        </RowContainer>

        <RowContainerBeetwen $mb={10}>
          <RowContainer>
            <MainContainer $mr={2}>
              <LocationIcon size={12} color={ColorsUI.gray.main} />
            </MainContainer>
            <TextUI $mr={15} ag={Ag['400_14']}>{`${item.countSelect}`}</TextUI>

            <MainContainer $mr={2}>
              <HearthIcon size={12} isActive color={ColorsUI.gray.main} />
            </MainContainer>
            <TextUI ag={Ag['400_14']}>{`${item.countSelect}`}</TextUI>
          </RowContainer>

          {item.isBaned ? (
            <TextUI ag={Ag['500_12']} color={ColorsUI.red}>
              {'Заблокирован'}
            </TextUI>
          ) : item.isSubscribe ? (
            <ViewPress
              $bg={ColorsUI.blue.main}
              $br={47}
              $widthPX={130}
              $pv={8}
              onPress={handleGoToPromo}>
              <TextUI $align={'center'} ag={Ag['500_12']}>
                {item.promo ? 'Ред.акцию' : 'Создать акцию'}
              </TextUI>
            </ViewPress>
          ) : null}
        </RowContainerBeetwen>

        {item.isBaned || !item.isSubscribe ? (
          <RowContainerBeetwenEnd>
            {item.isBaned ? (
              <RowContainer>
                <MainContainer $mr={5}>
                  <TelegramIcon size={16} />
                </MainContainer>
                <UnderLineText ag={Ag['400_12']} text={'Тех.поддержка'} />
              </RowContainer>
            ) : (
              <UnderLineText
                ag={Ag['400_14']}
                color={ColorsUI.green}
                text={'Активировать'}
              />
            )}
          </RowContainerBeetwenEnd>
        ) : (
          <RowContainerBeetwen $pv={10}>
            <UnderLineText
              ag={Ag['400_14']}
              text={'Деактивировать'}
              color={ColorsUI.red}
            />

            <UnderLineText
              onPress={() => handleGoToScreen(Screens.ORGANIZATION_EDIT)}
              ag={Ag['400_14']}
              text={'Редактировать'}
              color={ColorsUI.green}
            />
          </RowContainerBeetwen>
        )}
      </MainContainer>
    </BorderTopUI>
  );
};
