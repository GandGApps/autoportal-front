import React, {useEffect, useState} from 'react';
import {
  ColumnContainerBetweenFlex,
  ColumnContainerFlex,
} from '../../../template/containers/ColumnContainer';
import {GradientHeader} from '../../../components/GradientHeader';
import {useRoute} from '@react-navigation/native';
import {OrganizationPromoParams} from '../../../routes/params/RouteParams';
import {MainContainer} from '../../../template/containers/MainContainer';
import {ButtonUI} from '../../../template/ui/ButtonUI';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RowContainer} from '../../../template/containers/RowContainer';
import {LogoUI} from '../../../components/LogoUI';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {BorderTopUI} from '../../../template/ui/BorderTopUI';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {Textarea} from '../../../components/Textarea';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {InputSelectUI} from '../../../template/ui/InputSelectUI';
import {DateHelper} from '../../../helper/DateHelper';
import DatePicker from 'react-native-date-picker';

export const PromotionScreen = () => {
  const params = useRoute<OrganizationPromoParams>().params;

  const insets = useSafeAreaInsets();

  const [isEdit, setIsEdit] = useState(false);

  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(DateHelper.getToday());
  const [endDate, setEndDate] = useState(DateHelper.getToday());

  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  useEffect(() => {
    if (params.promo) {
      setIsEdit(true);
      setDescription(params.promo.description);
      setStartDate(params.promo.startPromo);
      setEndDate(params.promo.endPromo);
    }
  }, []);

  const handleChangeStartDate = (date: Date) => {
    setOpenStart(false);
    setStartDate(DateHelper.getFormatDate(date));

    if (DateHelper.isStartMoreEnd(date, endDate)) {
      setEndDate(DateHelper.getFormatDate(date));
    }
  };

  const handleChangeEndDate = (date: Date) => {
    setOpenEnd(false);
    setEndDate(DateHelper.getFormatDate(date));
  };

  return (
    <ColumnContainerFlex>
      <GradientHeader
        title={isEdit ? 'Редактировать акцию' : 'Создать акции'}
        isBack
      />
      <ColumnContainerBetweenFlex>
        <MainContainer>
          <RowContainer $pv={15} $ph={20}>
            <LogoUI size={45} url={params.logo} />
            <MainContainer $ml={15}>
              <TextUI ag={Ag['700_16']}>{params.name}</TextUI>
            </MainContainer>
          </RowContainer>

          <BorderTopUI $ph={20} $pv={20} $bg={ColorsUI.gray.second}>
            <Textarea value={description} onChangeText={setDescription} />
          </BorderTopUI>
          <BorderTopUI $mb={30} />

          <MainContainer $ph={20}>
            <TextUI $mb={20} ag={Ag['600_16']}>
              {'Период акции'}
            </TextUI>

            <RowContainer>
              <TextUI $mr={10} ag={Ag['500_16']}>
                {'c'}
              </TextUI>
              <MainContainer $mr={10}>
                <InputSelectUI
                  value={startDate}
                  onPress={() => setOpenStart(true)}
                />
              </MainContainer>

              <TextUI $mr={10} ag={Ag['500_16']}>
                {'по'}
              </TextUI>
              <MainContainer>
                <InputSelectUI
                  value={endDate}
                  onPress={() => setOpenEnd(true)}
                />
              </MainContainer>
            </RowContainer>
          </MainContainer>
        </MainContainer>

        <MainContainer $mb={Math.max(insets.bottom, 20)} $ph={20}>
          {isEdit ? (
            <ButtonUI
              $type={'border'}
              $mb={10}
              title="Удалить акцию"
              onPress={() =>
                Navigation.navigate(Screens.ORGANIZATION_PROMO_REMOVE)
              }
            />
          ) : null}
          <ButtonUI title={isEdit ? 'Сохранить и опубликовать' : 'Создать'} />
        </MainContainer>
      </ColumnContainerBetweenFlex>

      <DatePicker
        locale={'ru'}
        modal
        mode={'date'}
        open={openStart}
        date={DateHelper.getParseDate(startDate)}
        onConfirm={handleChangeStartDate}
        onCancel={() => {
          setOpenStart(false);
        }}
        androidVariant={'iosClone'}
        cancelText={'Отменить'}
        confirmText={'Подтвердить'}
        title={'Выберите дату начала акции'}
      />

      <DatePicker
        locale={'ru'}
        modal
        mode={'date'}
        open={openEnd}
        minimumDate={DateHelper.getParseDate(startDate)}
        date={DateHelper.getParseDate(endDate)}
        onConfirm={handleChangeEndDate}
        onCancel={() => {
          setOpenEnd(false);
        }}
        androidVariant={'iosClone'}
        cancelText={'Отменить'}
        confirmText={'Подтвердить'}
        title={'Выберите дату завершения акции'}
      />
    </ColumnContainerFlex>
  );
};
