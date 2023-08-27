import React, {RefObject} from 'react';
import {SwipeableModal} from './SwipbleModal';
import {IHandles} from 'react-native-modalize/lib/options';
import {Ag, TextUI} from '../template/ui/TextUI';
import {ScrollView, TouchableOpacity} from 'react-native';
import {BorderTopUI} from '../template/ui/BorderTopUI';
import {MainContainer} from '../template/containers/MainContainer';
import {useAppDispatch} from '../settings/redux/hooks';
import {filterChangeForm} from '../modules/organizations/OrganizationsSlice';

interface CitiesFilterProps {
  modalizeRef: RefObject<IHandles>;

  onPickCity?: (city: string) => void;
}

export const CitiesModal = (props: CitiesFilterProps) => {
  const dispatch = useAppDispatch();

  const handlePickCity = (city: string) => {
    if (props.onPickCity) {
      props.onPickCity(city);
    } else {
      dispatch(filterChangeForm({key: 'city', value: city}));
    }

    props.modalizeRef.current?.close();
  };

  return (
    <SwipeableModal modalizeRef={props.modalizeRef}>
      <MainContainer $pb={20}>
        <TextUI $mb={20} $align={'center'} ag={Ag['500_16']}>
          {'Выберите город'}
        </TextUI>
        <ScrollView showsVerticalScrollIndicator={false}>
          {MockCities.map(city => (
            <BorderTopUI key={`city-${city}`}>
              <TouchableOpacity onPress={() => handlePickCity(city)}>
                <MainContainer $pv={8}>
                  <TextUI $align={'center'} ag={Ag['400_16']}>
                    {city}
                  </TextUI>
                </MainContainer>
              </TouchableOpacity>
            </BorderTopUI>
          ))}
        </ScrollView>
      </MainContainer>
    </SwipeableModal>
  );
};

const MockCities = [
  'Москва',
  'Казань',
  'Санкт-Петербург',
  'Краснодар',
  'Новосибирск',
  'Екатеринбург',
  'Красноярск',
  'Тюмень',
];
