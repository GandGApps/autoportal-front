import React, {useEffect, useRef, useState} from 'react';
import {
  ColumnContainerFlex,
  ColumnContainerFlexEnd,
} from '../../../template/containers/ColumnContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  RowContainer,
  RowContainerBeetwen,
} from '../../../template/containers/RowContainer';
import {BackBtn} from '../../../template/ui/BackBtn';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {InputSelectUI} from '../../../template/ui/InputSelectUI';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../../modules/organizations/OrganizationsSlice';
import {FilterModal} from '../../../components/filterModal/FilterModal';
import {FilterFormKeys} from '../../../modules/organizations/form/FilterForm';
import {Nullable} from '../../../settings/types/BaseTypes';
import {Modalize} from 'react-native-modalize';
import {CitiesModal} from '../../../components/CitiesModal';
import {CategoriesModal} from '../../../components/CategoriesModal';
import {ButtonUI} from '../../../template/ui/ButtonUI';
import {
  getOrganizationFilter,
  getOrganizationList,
} from '../../../modules/organizations/_thunks';
import Navigation from '../../../routes/navigation/Navigation';

export const CatFilterScreens = () => {
  const {filterForm, organizationFilter} = useAppSelector(
    selectOrganizationsValues,
  );

  const [typeModal, setTypeModal] = useState<Nullable<FilterFormKeys>>(null);

  const filterModalRef = useRef<Modalize>(null);
  const citiesModalRef = useRef<Modalize>(null);
  const categoriesModalRef = useRef<Modalize>(null);

  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();

  useEffect(() => {
    dispatch(getOrganizationFilter(filterForm.category?._id!));
  }, []);

  const handleOpenFilterModal = (type: FilterFormKeys) => {
    setTypeModal(type);

    filterModalRef.current?.open();
  };

  const handleOpenModalCity = () => {
    citiesModalRef.current?.open();
  };

  const handleOpenModalCategory = () => {
    categoriesModalRef.current?.open();
  };

  const handleSearch = () => {
    dispatch(getOrganizationList());

    Navigation.pop();
  };

  return (
    <ColumnContainerFlex $mt={Math.max(insets.top, 20)} $ph={20}>
      <RowContainerBeetwen $mb={15}>
        <RowContainer>
          <BackBtn $mr={20} />
          <TextUI ag={Ag['500_18']}>{'Фильтр'}</TextUI>
        </RowContainer>
      </RowContainerBeetwen>

      <InputSelectUI
        containerStyles={{
          $mb: 10,
        }}
        value={filterForm.city}
        onPress={handleOpenModalCity}
      />
      <InputSelectUI
        containerStyles={{
          $mb: 10,
        }}
        value={filterForm.category?.title}
        onPress={() => handleOpenModalCategory()}
      />

      {organizationFilter?.typeService?.length ? (
        <InputSelectUI
          containerStyles={{
            $mb: 10,
          }}
          value={'Вид услуги'}
          onPress={() => handleOpenFilterModal('typeService')}
        />
      ) : null}
      {organizationFilter?.brandCar?.length ? (
        <InputSelectUI
          containerStyles={{
            $mb: 10,
          }}
          value={'Марка автомобиля'}
          onPress={() => handleOpenFilterModal('brandCar')}
        />
      ) : null}

      <InputSelectUI
        containerStyles={{
          $mb: 10,
        }}
        value={'Сортировка'}
        onPress={() => handleOpenFilterModal('sort')}
      />
      <InputSelectUI
        containerStyles={{
          $mb: 10,
        }}
        value={'График работы'}
        onPress={() => handleOpenFilterModal('schedule')}
      />

      <ColumnContainerFlexEnd $mb={Math.max(insets.bottom, 20)}>
        <ButtonUI title={'Поиск'} onPress={handleSearch} />
      </ColumnContainerFlexEnd>

      <FilterModal
        typeModal={typeModal}
        modalizeRef={filterModalRef}
        filterForm={filterForm}
      />
      <CitiesModal modalizeRef={citiesModalRef} />
      <CategoriesModal modalizeRef={categoriesModalRef} />
    </ColumnContainerFlex>
  );
};
