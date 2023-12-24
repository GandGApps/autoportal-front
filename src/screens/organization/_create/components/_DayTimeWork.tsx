import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {CheckboxUI} from '../../../../template/ui/CheckboxUI';
import {RowContainer} from '../../../../template/containers/RowContainer';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {DateHelper, DaysOfWeek} from '../../../../helper/DateHelper';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {RadioUI} from '../../../../template/ui/RadioUI';
import DatePicker from 'react-native-date-picker';
import {ScheduleModel} from '../../../../modules/organizations/types/OrganizationTypes';
import {useFocusEffect} from '@react-navigation/native';

interface CreateDayTimeWorkProps {
  indexDay: number;
  onChangeSchedule: (value: ScheduleModel, isRemove?: boolean) => void;
  schedule: ScheduleModel | null;
  sch?: ScheduleModel;
}

export const CreateDayTimeWork = (props: CreateDayTimeWorkProps) => {
  console.log('sch', props.sch);

  const [isActive, setIsActive] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);

  const [from, setfrom] = useState(props.sch?.from || '10:00');
  const [to, setto] = useState(props.sch?.to || '19:00');

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const handleActivedDay = () => {
    setIsActive(!isActive);
  };

  const handleChangeFromDate = (date: Date) => {
    setfrom(DateHelper.getFormatTime(date));
    setOpenFrom(false);
  };

  const handleChangeToDate = (date: Date) => {
    setto(DateHelper.getFormatTime(date));
    setOpenTo(false);
  };

  useEffect(() => {
    const day = DateHelper.getScheduleForm({
      indexDay: props.indexDay,
      to,
      from,
      isAllDay,
    });

    if (isActive) {
      props.onChangeSchedule(day);
      return;
    }

    props.onChangeSchedule(day, true);
  }, [isActive, isAllDay, from, to]);

  const dayOfWeek = useMemo(() => DaysOfWeek[props.indexDay], [props.indexDay]);
  const memoizedSch = useMemo(() => props.sch, [props.sch]);

  useEffect(() => {
    const dayInSchedule = memoizedSch && memoizedSch.some((item) => item.title === dayOfWeek);

    if (dayInSchedule) {
      const currentDay = memoizedSch.find((item) => item.title === dayOfWeek);
      setfrom(currentDay?.from || '10:00');
      setto(currentDay?.to || '19:00');
      setIsAllDay(currentDay?.isAllDay || false);
      setIsActive(true);
    } else {
      setfrom('10:00');
      setto('19:00');
      setIsAllDay(false);
      setIsActive(false);
    }
  }, [dayOfWeek, memoizedSch]);


  useFocusEffect(
    useCallback(() => {
      setIsActive(false);
      setIsAllDay(false);
      setOpenFrom(false);
      setOpenTo(false);
      setfrom('10:00');
      setto('19:00');
    }, []),
  );

  return (
    <MainContainer
      $borderColor={ColorsUI.gray.light}
      $br={10}
      $mb={8}
      $pv={15}
      $ph={15}>
      <ViewPress onPress={handleActivedDay}>
        <RowContainer>
          <CheckboxUI isActive={isActive} />
          <MainContainer $ml={5}>
            <TextUI ag={Ag['500_14']}>{DaysOfWeek[props.indexDay]}</TextUI>
          </MainContainer>
        </RowContainer>
      </ViewPress>
      {isActive ? (
        <MainContainer $mt={15}>
          {isAllDay ? (
            <ViewPress $mb={10} onPress={() => setIsAllDay(false)}>
              <RowContainer>
                <RadioUI isActive={!isAllDay} />
                <MainContainer $ml={5} $mr={10}>
                  <TextUI ag={Ag['400_14']}>{'Время'}</TextUI>
                </MainContainer>
                <MainContainer
                  $borderColor={ColorsUI.black}
                  $pv={3}
                  $ph={5}
                  $mr={5}>
                  <TextUI ag={Ag['600_14']}>{from}</TextUI>
                </MainContainer>
                <MainContainer $mr={5}>
                  <TextUI ag={Ag['400_14']}>{'до'}</TextUI>
                </MainContainer>
                <MainContainer
                  $borderColor={ColorsUI.black}
                  $pv={3}
                  $ph={5}
                  $mr={5}>
                  <TextUI ag={Ag['600_14']}>{to}</TextUI>
                </MainContainer>
              </RowContainer>
            </ViewPress>
          ) : (
            <RowContainer $mb={10}>
              <RadioUI isActive={!isAllDay} />
              <MainContainer $ml={5} $mr={10}>
                <TextUI ag={Ag['400_14']}>{'Время'}</TextUI>
              </MainContainer>
              <ViewPress
                $borderColor={ColorsUI.black}
                $mr={5}
                $pv={3}
                $ph={5}
                onPress={() => setOpenFrom(true)}>
                <TextUI ag={Ag['600_14']}>{from}</TextUI>
              </ViewPress>

              <MainContainer $mr={5}>
                <TextUI ag={Ag['400_14']}>{'до'}</TextUI>
              </MainContainer>
              <ViewPress
                $borderColor={ColorsUI.black}
                $pv={3}
                $ph={5}
                $mr={5}
                onPress={() => setOpenTo(true)}>
                <TextUI ag={Ag['600_14']}>{to}</TextUI>
              </ViewPress>
            </RowContainer>
          )}

          <ViewPress onPress={() => setIsAllDay(true)}>
            <RowContainer>
              <RadioUI isActive={isAllDay} />
              <MainContainer $ml={5}>
                <TextUI ag={Ag['400_14']}>{'Круглосуточно'}</TextUI>
              </MainContainer>
            </RowContainer>
          </ViewPress>
        </MainContainer>
      ) : null}

      <DatePicker
        locale={'ru'}
        is24hourSource={'locale'}
        modal
        mode={'time'}
        open={openFrom}
        date={DateHelper.getParseTime(from)}
        onConfirm={handleChangeFromDate}
        onCancel={() => setOpenFrom(false)}
        androidVariant={'iosClone'}
        cancelText={'Отменить'}
        confirmText={'Подтвердить'}
        title={'Начало рабочего дня'}
      />

      <DatePicker
        locale={'ru'}
        is24hourSource={'locale'}
        modal
        mode={'time'}
        open={openTo}
        date={DateHelper.getParseTime(to)}
        onConfirm={handleChangeToDate}
        onCancel={() => setOpenTo(false)}
        androidVariant={'iosClone'}
        cancelText={'Отменить'}
        confirmText={'Подтвердить'}
        title={'Конец рабочего дня'}
      />
    </MainContainer>
  );
};
