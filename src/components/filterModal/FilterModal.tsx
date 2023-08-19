import React, {RefObject, useEffect, useState} from 'react';
import {SwipeableModal} from '../SwipbleModal';
import {IHandles} from 'react-native-modalize/lib/options';
import {Ag, TextUI} from '../../template/ui/TextUI';
import {ScrollView, View} from 'react-native';
import {MainContainer} from '../../template/containers/MainContainer';
import {useAppDispatch, useAppSelector} from '../../settings/redux/hooks';
import {
  filterChangeForm,
  selectOrganizationsValues,
} from '../../modules/organizations/OrganizationsSlice';
import {FilterFormKeys} from '../../modules/organizations/form/FilterForm';
import {TypeService} from '../../modules/organizations/models/TypeService';
import {
  SortFilterType,
  UnitsFilter,
} from '../../modules/organizations/types/OrganizationTypes';
import {OrganizationHelper} from '../../modules/organizations/helpers/OrganizationHelper';
import {Nullable} from '../../settings/types/BaseTypes';
import {FilterModalPick} from './components/FilterModalPick';
import {RowContainerBeetwen} from '../../template/containers/RowContainer';
import {ButtonUI} from '../../template/ui/ButtonUI';
import {CenterContainerFlex} from '../../template/containers/CenterContainer';
import {Loader} from '../Loader';
import {mockSchedule} from '../../modules/organizations/mock/MockSchedule';

interface CitiesFilterProps {
  modalizeRef: RefObject<IHandles>;
  typeModal: Nullable<FilterFormKeys>;
}

export const FilterModal = (props: CitiesFilterProps) => {
  const {filterForm, organizationFilter} = useAppSelector(
    selectOrganizationsValues,
  );
  const dispatch = useAppDispatch();

  const [isSort, setIsSort] = useState(false);
  const [typeSort, setTypeSort] = useState<Nullable<SortFilterType>>(null);

  const [list, setList] = useState<TypeService[] | UnitsFilter[]>([]);
  const [pickList, setPickList] = useState<string[]>([]);

  const [openLoad, setOpenLoad] = useState(false);

  useEffect(() => {
    if (openLoad) {
      handleOpenEffect();

      setOpenLoad(false);
    }
  }, [openLoad]);

  const handleOpenEffect = () => {
    setIsSort(false);

    switch (props.typeModal) {
      case 'typeService': {
        setPickList(filterForm.typeService || []);
        setList(organizationFilter?.typeService!);
        break;
      }
      case 'brandCar': {
        setPickList(filterForm.brandCar || []);
        setList(organizationFilter?.brandCar!);
        break;
      }
      case 'sort': {
        setTypeSort(filterForm.sort);
        setIsSort(true);
        break;
      }
      case 'schedule': {
        setPickList(filterForm.schedule || []);
        setList(mockSchedule);
        break;
      }
      default: {
        setList([]);
        break;
      }
    }
  };

  const handlePickItem = (value: any) => {
    if (value.subServices) {
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

  const handleSort = (value: SortFilterType) => {
    setTypeSort(value);
  };

  const handleCloseModal = () => {
    setTypeSort(null);
    setList([]);
    setPickList([]);
  };

  const handleSavePick = () => {
    dispatch(
      filterChangeForm({
        key: props.typeModal!,
        value: props.typeModal === 'sort' ? typeSort : pickList,
      }),
    );

    props.modalizeRef.current?.close();
  };

  const handleResetPick = () => {
    dispatch(
      filterChangeForm({
        key: props.typeModal!,
        value: null,
      }),
    );

    props.modalizeRef.current?.close();
  };

  return (
    <SwipeableModal
      modalizeRef={props.modalizeRef}
      onOpen={() => setOpenLoad(true)}
      onClosed={handleCloseModal}>
      <>
        {props.typeModal ? (
          <MainContainer $pb={20}>
            <TextUI $mb={20} $align={'center'} ag={Ag['500_16']}>
              {OrganizationHelper.getModalTitle(props.typeModal)}
            </TextUI>
            <ScrollView showsVerticalScrollIndicator={false}>
              {isSort ? (
                <>
                  <FilterModalPick
                    sortTitle={'Рейтинг от низкого'}
                    onPickItem={() => handleSort('ratingASC')}
                    sortActive={typeSort === 'ratingASC'}
                  />
                  <FilterModalPick
                    sortTitle={'Рейтинг от высокого'}
                    onPickItem={() => handleSort('ratingDESC')}
                    sortActive={typeSort === 'ratingDESC'}
                  />
                </>
              ) : (
                list.map(item => (
                  <View key={`${props.typeModal}-${item._id}`}>
                    <FilterModalPick
                      item={item}
                      onPickItem={() => handlePickItem(item)}
                      pickList={pickList}
                      isCatSub={
                        props.typeModal === 'typeService' &&
                        (item as TypeService).subServices !== undefined
                      }
                    />

                    {props.typeModal === 'typeService' &&
                    (item as TypeService).subServices
                      ? (item as TypeService).subServices?.map(subItem => (
                          <MainContainer $ml={20} key={`sub-${subItem._id}`}>
                            <FilterModalPick
                              item={subItem}
                              onPickItem={() => handlePickItem(subItem)}
                              pickList={pickList}
                            />
                          </MainContainer>
                        ))
                      : null}
                  </View>
                ))
              )}
            </ScrollView>
            <RowContainerBeetwen $mt={20}>
              <ButtonUI
                $type={'border'}
                $widthPRC={48}
                title={'Сбросить'}
                onPress={handleResetPick}
              />
              <ButtonUI
                $widthPRC={48}
                title={'Сохранить'}
                onPress={handleSavePick}
              />
            </RowContainerBeetwen>
          </MainContainer>
        ) : (
          <CenterContainerFlex>
            <Loader />
          </CenterContainerFlex>
        )}
      </>
    </SwipeableModal>
  );
};
