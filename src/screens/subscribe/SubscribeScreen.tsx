import React, {useState} from 'react';
import {ColumnContainerFlex} from '../../template/containers/ColumnContainer';
import {GradientHeader} from '../../components/GradientHeader';
import {SubOrganizationParams} from '../../routes/params/RouteParams';
import {useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Ag, TextUI} from '../../template/ui/TextUI';
import {StyleSheet} from 'react-native';
import {ButtonUI} from '../../template/ui/ButtonUI';
import {MainContainer} from '../../template/containers/MainContainer';
import {ColorsUI} from '../../template/styles/ColorUI';
import {ViewPress} from '../../template/containers/ViewPress';
import {CheckIcon} from '../../template/icons/CheckIcon';
import {AbsoluteContainer} from '../../template/containers/AbsoluteContainer';

export const SubscribeScreen = () => {
  const {organizationId} = useRoute<SubOrganizationParams>().params;

  console.log(organizationId);

  const [type, setType] = useState<'month' | 'year'>('month');

  const insets = useSafeAreaInsets();

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
          style={compStyles.gap10}
          $borderColor={ColorsUI.black}
          $br={10}
          $ph={20}
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

          <TextUI ag={Ag['500_25']}>{'149 Р / месяц'}</TextUI>

          <TextUI ag={Ag['500_16']}>{'Первые два месяца бесплатно'}</TextUI>
        </ViewPress>

        <ViewPress
          onPress={() => setType('year')}
          style={compStyles.gap10}
          $borderColor={ColorsUI.black}
          $br={10}
          $ph={20}
          $pb={20}
          $pt={40}>
          {type === 'year' && (
            <AbsoluteContainer $right={5} $top={5}>
              <CheckIcon />
            </AbsoluteContainer>
          )}
          <TextUI
            ag={Ag['500_16']}
            color={ColorsUI.green}
            style={{textTransform: 'uppercase'}}>
            {'Годовая'}
          </TextUI>

          <TextUI ag={Ag['500_25']}>{'120 Р / месяц*'}</TextUI>
          <TextUI ag={Ag['500_14']} color={ColorsUI.gray.main}>
            {'*1440р / год'}
          </TextUI>

          <TextUI ag={Ag['500_16']}>{'Первые два месяца бесплатно'}</TextUI>
        </ViewPress>
        <ColumnContainerFlex />
        <ButtonUI title={'Далее'} />
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
});
