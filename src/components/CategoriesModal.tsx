import React, {RefObject} from 'react';
import {SwipeableModal} from './SwipbleModal';
import {IHandles} from 'react-native-modalize/lib/options';
import {Ag, TextUI} from '../template/ui/TextUI';
import {ScrollView, TouchableOpacity} from 'react-native';
import {BorderTopUI} from '../template/ui/BorderTopUI';
import {MainContainer} from '../template/containers/MainContainer';
import {useAppDispatch, useAppSelector} from '../settings/redux/hooks';
import {
  filterChangeForm,
  resetFilterForm,
  selectOrganizationsValues,
} from '../modules/organizations/OrganizationsSlice';
import {Category} from '../modules/organizations/models/Category';
import {
  getFavoritesList,
  getOrganizationList,
} from '../modules/organizations/_thunks';

interface CitiesFilterProps {
  modalizeRef: RefObject<IHandles>;
  fromFavorite?: boolean | null;
  onPickCategories?: (cat: Category) => void;
}

export const CategoriesModal = (props: CitiesFilterProps) => {
  const {categories} = useAppSelector(selectOrganizationsValues);
  const dispatch = useAppDispatch();

  const handlePickCity = (category: Category) => {
    if (props.onPickCategories) {
      props.onPickCategories(category);
    } else {
      dispatch(resetFilterForm());
      dispatch(filterChangeForm({key: 'category', value: category}));

      dispatch(getOrganizationList());
    }

    props.modalizeRef.current?.close();
  };

  return (
    <SwipeableModal modalizeRef={props.modalizeRef}>
      <MainContainer $pb={20}>
        <TextUI $mb={20} $align={'center'} ag={Ag['500_16']}>
          {'Выберите категорию'}
        </TextUI>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Добавляем "Все категории" как первый элемент списка */}
          {props.fromFavorite && (
            <BorderTopUI>
              <TouchableOpacity
                onPress={() => handlePickCity({title: 'Все категории'})}>
                <MainContainer $pv={8}>
                  <TextUI $align={'center'} ag={Ag['400_16']}>
                    {'Все категории'}
                  </TextUI>
                </MainContainer>
              </TouchableOpacity>
            </BorderTopUI>
          )}

          {/* Рендерим остальные категории */}
          {categories.map(category => (
            <BorderTopUI key={`category-${category._id}`}>
              <TouchableOpacity
                onPress={() => handlePickCity(category as Category)}>
                <MainContainer $pv={8}>
                  <TextUI $align={'center'} ag={Ag['400_16']}>
                    {category.title}
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
