import React, {RefObject, useCallback, useState} from 'react';
import {SwipeableModal} from './SwipbleModal';
import {IHandles} from 'react-native-modalize/lib/options';
import {Ag, TextUI} from '../template/ui/TextUI';
import {Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import {BorderTopUI} from '../template/ui/BorderTopUI';
import {MainContainer} from '../template/containers/MainContainer';
import {useAppDispatch, useAppSelector} from '../settings/redux/hooks';
import {filterChangeForm} from '../modules/organizations/OrganizationsSlice';
import {resetCities, selectCitiesValues} from '../modules/cities/CitiesSlice';
import {InputUI} from '../template/ui/InputUI';
import {useDebouncedEffect} from '../template/hooks/useDebouncedEffect';
import {getCities} from '../modules/cities/thunks/cities.thunk';
import {useFocusEffect} from '@react-navigation/native';
import {
  getBanners,
  getOrganizationList,
} from '../modules/organizations/_thunks';
import {cityLocalService} from '../modules/auth/services/city/admin.fabric';

interface CitiesFilterProps {
  modalizeRef: RefObject<IHandles>;

  onPickCity?: (city: string) => void;
}

export const CitiesModal = (props: CitiesFilterProps) => {
  const {cities} = useAppSelector(selectCitiesValues);
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState('');

  const height = Dimensions.get('screen').height;

  useDebouncedEffect(
    () => {
      dispatch(getCities(query));
    },
    500,
    [query],
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(resetCities);
    }, [query]),
  );

  const handlePickCity = (city: string) => {
    if (props.onPickCity) {
      props.onPickCity(city);
    } else {
      dispatch(filterChangeForm({key: 'city', value: city}));

      dispatch(getBanners());
      dispatch(getOrganizationList());

      cityLocalService.setCity(city);
    }

    props.modalizeRef.current?.close();
  };

  return (
    <SwipeableModal modalizeRef={props.modalizeRef}>
      <MainContainer $pb={20} $heightPX={height / 2}>
        <TextUI $mb={20} $align={'center'} ag={Ag['500_16']}>
          {'Выберите город'}
        </TextUI>
        <InputUI
          placeholder={'Название города'}
          containerStyles={{$mb: 20}}
          value={query}
          onChangeText={setQuery}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {cities.map(city => (
            <BorderTopUI key={`city-${city.id}`}>
              <TouchableOpacity onPress={() => handlePickCity(city.city)}>
                <MainContainer $pv={8}>
                  <TextUI $align={'center'} ag={Ag['400_16']}>
                    {city.city}
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
