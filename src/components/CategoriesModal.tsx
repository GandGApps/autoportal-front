import React, {RefObject} from 'react';
import {SwipeableModal} from './SwipbleModal';
import {IHandles} from 'react-native-modalize/lib/options';
import {Ag, TextUI} from '../template/ui/TextUI';
import {ScrollView, TouchableOpacity} from 'react-native';
import {BorderTopUI} from '../template/ui/BorderTopUI';
import {MainContainer} from '../template/containers/MainContainer';
import {useAppDispatch} from '../settings/redux/hooks';
import {filterChangeForm} from '../modules/organizations/OrganizationsSlice';
import {MockCategories} from '../screens/categories/mock/MockCategories';
import {Category} from '../modules/organizations/models/Category';

interface CitiesFilterProps {
  modalizeRef: RefObject<IHandles>;
}

export const CategoriesModal = (props: CitiesFilterProps) => {
  const dispatch = useAppDispatch();

  const handlePickCity = (city: Category) => {
    dispatch(filterChangeForm({key: 'category', value: city}));

    props.modalizeRef.current?.close();
  };

  return (
    <SwipeableModal modalizeRef={props.modalizeRef}>
      <MainContainer $pb={20}>
        <TextUI $mb={20} $align={'center'} ag={Ag['500_16']}>
          {'Выберите категорию'}
        </TextUI>
        <ScrollView showsVerticalScrollIndicator={false}>
          {MockCategories.map(category => (
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
