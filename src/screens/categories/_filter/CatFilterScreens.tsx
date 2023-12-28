import React, {Fragment, useEffect, useRef, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
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
import {ButtonUI} from '../../../template/ui/ButtonUI';
import {
  getOrganizationFilter,
  getOrganizationList,
} from '../../../modules/organizations/_thunks';
import Navigation from '../../../routes/navigation/Navigation';
import {CenterContainer} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';
import {Screens} from '../../../routes/models/Screens';

export const CatFilterScreens = () => {
  const {filterForm, organizationFilter} = useAppSelector(
    selectOrganizationsValues,
  );

  const [typeModal, setTypeModal] = useState<Nullable<FilterFormKeys>>(null);

  const [isLoading, setIsLoading] = useState(false);

  const filterModalRef = useRef<Modalize>(null);

  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getOrganizationFilter(filterForm.category?._id!)).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const handleOpenFilterModal = (type: FilterFormKeys) => {
    setTypeModal(type);

    filterModalRef.current?.open();
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
      {!isLoading ? (
        <Fragment>
          {filterForm.category?.noService === false ? (
            <InputSelectUI
              containerStyles={{
                $mb: 10,
              }}
              value={organizationFilter?.titleTypeService || 'Вид услуги'}
              onPress={() => handleOpenFilterModal('typeService')}
            />
          ) : null}
          {filterForm.category?.noBrands === false ? (
            <InputSelectUI
              containerStyles={{
                $mb: 10,
              }}
              value={'Марка автомобиля'}
              onPress={() => {
                Navigation.navigate(Screens.MODAL_BRANSCARS, {
                  isCreate: false,
                });
              }}
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
        </Fragment>
      ) : (
        <CenterContainer>
          <Loader size={24} />
        </CenterContainer>
      )}
      <ColumnContainerFlex />
      <ButtonUI
        $mb={Math.max(insets.bottom, 20)}
        title={'Поиск'}
        onPress={handleSearch}
      />

      <FilterModal
        typeModal={typeModal}
        modalizeRef={filterModalRef}
        filterForm={filterForm}
      />
    </ColumnContainerFlex>
  );
};
