import {useRoute} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {FlatList, KeyboardAvoidingView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {OrganizationHelper} from '../../modules/organizations/helpers/OrganizationHelper';
import {TypeService} from '../../modules/organizations/models/TypeService';
import {
  createChangeForm,
  filterChangeForm,
  selectOrganizationsValues,
} from '../../modules/organizations/OrganizationsSlice';
import {UnitsFilter} from '../../modules/organizations/types/OrganizationTypes';
import Navigation from '../../routes/navigation/Navigation';
import {FilterModalBrandsParams} from '../../routes/params/RouteParams';
import {useAppDispatch, useAppSelector} from '../../settings/redux/hooks';
import {MainContainer} from '../../template/containers/MainContainer';
import {RowContainerBeetwen} from '../../template/containers/RowContainer';
import {ViewPress} from '../../template/containers/ViewPress';
import {useDebouncedEffect} from '../../template/hooks/useDebouncedEffect';
import {ColorsUI} from '../../template/styles/ColorUI';
import {ButtonUI} from '../../template/ui/ButtonUI';
import {InputUI} from '../../template/ui/InputUI';
import {Ag, TextUI} from '../../template/ui/TextUI';
import {FilterModalPick} from './components/FilterModalPick';
import { createOrganization } from '../../modules/organizations/thunks/create.thunk';
import { getPersonalOrganizations } from '../../modules/organizations/_thunks';

export const BrandsCarsModal: FC = function BrandsCarsModal({}) {
  const {organizationFilter, createForm, filterForm} = useAppSelector(
    selectOrganizationsValues,
  );

  const insets = useSafeAreaInsets();

  const {isCreate} = useRoute<FilterModalBrandsParams>().params;

  const dispatch = useAppDispatch();

  const form = isCreate ? createForm! : filterForm!;

  const [list, setList] = useState<TypeService[] | UnitsFilter[]>([]);
  const [pickList, setPickList] = useState<string[]>([]);

  const [brandName, setBrandName] = useState('');

  useDebouncedEffect(
    () => {
      const filterBrand =
        organizationFilter?.brandCar?.filter(item =>
          item.title.toLowerCase().includes(brandName.toLowerCase()),
        ) || [];

      setList(filterBrand);
    },
    500,
    [brandName],
  );

  useEffect(() => {
    setPickList(form.brandCar || []);
    setList(organizationFilter?.brandCar!);
  }, []);

  const handlePickAllBrands = () => {
    const unPickList = list
      .filter(item => !pickList.includes(item._id))
      .map(item => item._id);
    setPickList([...pickList, ...unPickList]);
  };

  const handleUnPickAllBrands = () => {
    setPickList([]);
  };

  const handlePickItem = (value: any) => {
    console.log('my picked item', value)
    if (value.subServices && value.subServices.length > 0) {
      setPickList(
        OrganizationHelper.getSubsCheckedList(pickList, value.subServices),
      );
      return;
    }

    if (pickList.includes(value._id)) {
      const filterPick = pickList.filter(item => item !== value._id);
      setPickList(filterPick);
    } else {
      setPickList([...pickList, value._id]);
    }
  };
  const handleResetPick = () => {
    if (isCreate) {
      dispatch(
        createChangeForm({
          key: 'brandCar',
          value: [],
        }),
      );
    } else {
      dispatch(
        filterChangeForm({
          key: 'brandCar',
          value: null,
        }),
      );
    }

    Navigation.pop();
  };

  const handleSavePick = () => {

    if (isCreate) {
      dispatch(
        createChangeForm({
          key: 'brandCar',
          value: pickList,
        }),
      );
    } else {
      dispatch(
        filterChangeForm({
          key: 'brandCar',
          value: pickList,
        }),
      );
    }
    dispatch(createOrganization(true))
      .then(() => {
        dispatch(getPersonalOrganizations());
      })
      .catch(e => {})
      .finally(() => {
      });
    Navigation.pop();
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingBottom: insets.bottom,
      }}>
      <TextUI ag={Ag['500_14']} $align={'center'}>
        {'Марки'}
      </TextUI>
      <MainContainer $mt={20}>
        <InputUI
          value={brandName}
          placeholder={'Укажите название марки'}
          onChangeText={setBrandName}
        />
      </MainContainer>
      <ViewPress $mt={10} $mb={10} onPress={handlePickAllBrands}>
        <TextUI ag={Ag['500_12']} color={ColorsUI.blue.second}>
          {'выбрать все марки'}
        </TextUI>
      </ViewPress>
      <ViewPress $mb={10} onPress={handleUnPickAllBrands}>
        <TextUI ag={Ag['500_12']} color={ColorsUI.blue.second}>
          {'снять все марки'}
        </TextUI>
      </ViewPress>
      <FlatList
        style={{flex: 1}}
        data={[
          ...list.filter(item => pickList.includes(item._id)),
          ...list.filter(item => !pickList.includes(item._id)),
        ]}
        renderItem={({item}) => (
          <FilterModalPick
            item={item}
            onPickItem={() => {handlePickItem(item)}}
            pickList={pickList}
            isCatSub={false}
          />
        )}
        keyExtractor={item => `brands-cars-pick-${item._id}`}
      />

      <RowContainerBeetwen $mt={20}>
        <ButtonUI
          $type={'border'}
          $widthPRC={48}
          title={'Сбросить'}
          onPress={handleResetPick}
        />
        <ButtonUI $widthPRC={48} title={'Сохранить'} onPress={handleSavePick} />
      </RowContainerBeetwen>
    </KeyboardAvoidingView>
  );
};

// const compStyles = StyleSheet.create({});
