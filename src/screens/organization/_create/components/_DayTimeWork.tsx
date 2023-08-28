import React, {useState} from 'react';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {CheckboxUI} from '../../../../template/ui/CheckboxUI';
import {RowContainer} from '../../../../template/containers/RowContainer';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {DateHelper, DaysOfWeek} from '../../../../helper/DateHelper';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {RadioUI} from '../../../../template/ui/RadioUI';
import DatePicker from 'react-native-date-picker';
import {MaskHelper} from '../../../../helper/MaskHelper';

interface CreateDayTimeWorkProps {
  indexDay: number;
}

export const CreateDayTimeWork = (props: CreateDayTimeWorkProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);

  const [fromTime, setFromTime] = useState('10:00');
  const [toTime, setToTime] = useState('19:00');

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const handleActivedDay = () => {
    setIsActive(!isActive);
  };

  const handleChangeFromDate = (date: Date) => {
    setFromTime(DateHelper.getFormatTime(date));
    setOpenFrom(false);
  };

  const handleChangeToDate = (date: Date) => {
    setToTime(DateHelper.getFormatTime(date));
    setOpenTo(false);
  };

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
                  <TextUI ag={Ag['400_14']}>{`Время`}</TextUI>
                </MainContainer>
                <MainContainer
                  $borderColor={ColorsUI.black}
                  $pv={3}
                  $ph={5}
                  $mr={5}>
                  <TextUI ag={Ag['600_14']}>{fromTime}</TextUI>
                </MainContainer>
                <MainContainer $mr={5}>
                  <TextUI ag={Ag['400_14']}>{`до`}</TextUI>
                </MainContainer>
                <MainContainer
                  $borderColor={ColorsUI.black}
                  $pv={3}
                  $ph={5}
                  $mr={5}>
                  <TextUI ag={Ag['600_14']}>{toTime}</TextUI>
                </MainContainer>
              </RowContainer>
            </ViewPress>
          ) : (
            <RowContainer $mb={10}>
              <RadioUI isActive={!isAllDay} />
              <MainContainer $ml={5} $mr={10}>
                <TextUI ag={Ag['400_14']}>{`Время`}</TextUI>
              </MainContainer>
              <ViewPress
                $borderColor={ColorsUI.black}
                $mr={5}
                $pv={3}
                $ph={5}
                onPress={() => setOpenFrom(true)}>
                <TextUI ag={Ag['600_14']}>{fromTime}</TextUI>
              </ViewPress>

              <MainContainer $mr={5}>
                <TextUI ag={Ag['400_14']}>{`до`}</TextUI>
              </MainContainer>
              <ViewPress
                $borderColor={ColorsUI.black}
                $pv={3}
                $ph={5}
                $mr={5}
                onPress={() => setOpenTo(true)}>
                <TextUI ag={Ag['600_14']}>{toTime}</TextUI>
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
        date={DateHelper.getParseTime(fromTime)}
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
        date={DateHelper.getParseTime(toTime)}
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
