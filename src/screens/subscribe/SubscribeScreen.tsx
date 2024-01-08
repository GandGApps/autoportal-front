import React, {useEffect, useState} from 'react';
import {ColumnContainerFlex} from '../../template/containers/ColumnContainer';
import {GradientHeader} from '../../components/GradientHeader';
import {SubOrganizationParams} from '../../routes/params/RouteParams';
import {useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Ag, TextUI} from '../../template/ui/TextUI';
import {StyleSheet} from 'react-native';
import {ButtonUI} from '../../template/ui/ButtonUI';
import {ColorsUI} from '../../template/styles/ColorUI';
import {ViewPress} from '../../template/containers/ViewPress';
import {CheckIcon} from '../../template/icons/CheckIcon';
import {AbsoluteContainer} from '../../template/containers/AbsoluteContainer';
import {
  getSubInfo,
  getSubcribe,
} from '../../modules/organizations/thunks/subscribe.thunk';
import {useAppDispatch, useAppSelector} from '../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../modules/organizations/OrganizationsSlice';
import {CenterContainerFlex} from '../../template/containers/CenterContainer';
import {Loader} from '../../components/Loader';
import {OrganizationHelper} from '../../modules/organizations/helpers/OrganizationHelper';
import {MainContainer} from '../../template/containers/MainContainer';
import {RowContainer} from '../../template/containers/RowContainer';
import {UnderLineText} from '../../components/UnderLineText';
import Navigation from '../../routes/navigation/Navigation';
import {Screens} from '../../routes/models/Screens';

export const SubscribeScreen = () => {
  const {organizationId} = useRoute<SubOrganizationParams>().params;

  const {subInfo} = useAppSelector(selectOrganizationsValues);

  const dispatch = useAppDispatch();

  const [type, setType] = useState<'month' | 'year'>('month');

  const [isLoading, setIsLoading] = useState(false);
  const [isSubLoading, setIsSubLoading] = useState(false);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    dispatch(getSubInfo()).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const handleGetSubctibe = () => {
    setIsSubLoading(true);
    dispatch(getSubcribe({type: type, id: organizationId}))
      .catch(e => {})
      .finally(() => {
        setIsSubLoading(false);
      });
  };

  if (isLoading || !subInfo?.year_amount || !subInfo.month_amount) {
    <CenterContainerFlex>
      <Loader size={20} />
    </CenterContainerFlex>;
  }

  return (
    <ColumnContainerFlex>
      <GradientHeader isBack={true} title={'Подписки'} />
      <ColumnContainerFlex
        $pt={20}
        $ph={20}
        style={compStyles.gap20}
        $pb={insets.bottom}>
        <TextUI $align={'center'} ag={Ag['500_18']}>
          {'Выберите вариант подписки'}
        </TextUI>
        <ViewPress
          onPress={() => setType('month')}
          style={[compStyles.gap10, type === 'month' && compStyles.shadow]}
          $borderColor={ColorsUI.black}
          $br={10}
          $ph={20}
          $bg={ColorsUI.white}
          $pb={20}
          $pt={40}>
          {type === 'month' && (
            <AbsoluteContainer $right={5} $top={5}>
              <CheckIcon />
            </AbsoluteContainer>
          )}
          <TextUI
            ag={Ag['500_16']}
            color={ColorsUI.green}
            style={{textTransform: 'uppercase'}}>
            {'Ежемесячная'}
          </TextUI>

          <TextUI
            ag={Ag['500_25']}>{`${subInfo?.month_amount} Р / месяц`}</TextUI>
        </ViewPress>

        <ViewPress
          $bg={ColorsUI.white}
          style={type === 'year' && compStyles.shadow}
          onPress={() => setType('year')}
          $borderColor={ColorsUI.black}
          $br={10}
          $pb={20}>
          <RowContainer $mb={10}>
            <MainContainer
              $bg={ColorsUI.firm}
              $pv={10}
              $ph={10}
              $br={10}
              $mr={20}>
              <TextUI ag={Ag['500_16']}>{'Популярно'}</TextUI>
            </MainContainer>
            <TextUI
              ag={Ag['500_16']}
              color={
                ColorsUI.green
              }>{`Экономия ${subInfo?.percentage}%`}</TextUI>
          </RowContainer>
          <MainContainer $ph={20} style={compStyles.gap10}>
            <TextUI
              ag={Ag['500_16']}
              color={ColorsUI.green}
              style={{textTransform: 'uppercase'}}>
              {'Годовая'}
            </TextUI>

            <TextUI ag={Ag['500_25']}>{`${
              subInfo?.year_amount! / 12
            } Р / месяц*`}</TextUI>
            <TextUI ag={Ag['500_14']} color={ColorsUI.gray.main}>
              {`*${subInfo?.year_amount}р / год`}
            </TextUI>

            {Boolean(subInfo?.free_period) && (
              <TextUI ag={Ag['500_16']}>
                {OrganizationHelper.freeMonthSubText(subInfo?.free_period!)}
              </TextUI>
            )}
          </MainContainer>

          {type === 'year' && (
            <AbsoluteContainer $right={5} $top={5}>
              <CheckIcon />
            </AbsoluteContainer>
          )}
        </ViewPress>

        <UnderLineText
          text={'Договор публичной оферты'}
          onPress={() => Navigation.navigate(Screens.OFFER_PDF)}
        />
        <ColumnContainerFlex />
        <ButtonUI
          $btnDisabled={isSubLoading}
          title={'Далее'}
          onPress={handleGetSubctibe}
        />
      </ColumnContainerFlex>
    </ColumnContainerFlex>
  );
};

const compStyles = StyleSheet.create({
  gap10: {
    gap: 10,
  },
  gap20: {
    gap: 20,
  },
  shadow: {
    shadowColor: ColorsUI.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.24,
    shadowRadius: 6.27,

    elevation: 10,
  },
});
