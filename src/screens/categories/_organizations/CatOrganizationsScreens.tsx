import React, {useRef, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {Modalize} from 'react-native-modalize';
import {CitiesModal} from '../../../components/CitiesModal';
import {RowContainerBeetwen} from '../../../template/containers/RowContainer';
import {BackBtn} from '../../../template/ui/BackBtn';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MainContainer} from '../../../template/containers/MainContainer';
import {TouchableOpacity} from 'react-native';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {InputUI} from '../../../template/ui/InputUI';
import {useAppSelector} from '../../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../../modules/organizations/OrganizationsSlice';
import {SelectUI} from '../../../template/ui/SelectUI';
import {FilterIcon} from '../../../template/icons/FilterIcon';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {CategoriesModal} from '../../../components/CategoriesModal';

export const CatOrganizationsScreens = () => {
  const {filterForm} = useAppSelector(selectOrganizationsValues);
  const citiesModalRef = useRef<Modalize>(null);
  const categoriesModalRef = useRef<Modalize>(null);

  const insets = useSafeAreaInsets();

  const [search, setSearch] = useState('');

  const handleOpenModalCity = () => {
    citiesModalRef.current?.open();
  };

  const handleResetFilter = () => {};

  const handleGoToFilter = () => {
    Navigation.navigate(Screens.CAT_FILTER);
  };

  const handleOpenModalCategory = () => {
    categoriesModalRef.current?.open();
  };

  return (
    <ColumnContainerFlex $mt={Math.max(insets.top, 20)}>
      <MainContainer $ph={20}>
        <RowContainerBeetwen>
          <BackBtn />

          <TouchableOpacity onPress={handleResetFilter}>
            <TextUI ag={Ag['500_12']}>{'Очистить фильтр'}</TextUI>
          </TouchableOpacity>
        </RowContainerBeetwen>

        <RowContainerBeetwen $mt={20}>
          <ColumnContainerFlex $mr={10}>
            <InputUI
              value={search}
              onChangeText={setSearch}
              placeholder={'Поиск по названию'}
            />
          </ColumnContainerFlex>

          <TouchableOpacity onPress={handleGoToFilter}>
            <FilterIcon isActive={filterForm.typeService !== null} />
          </TouchableOpacity>
        </RowContainerBeetwen>

        <RowContainerBeetwen>
          <MainContainer $mt={10} $widthPRC={48}>
            <SelectUI text={filterForm.city} onPress={handleOpenModalCity} />
          </MainContainer>

          <MainContainer $mt={10} $widthPRC={48}>
            <SelectUI
              text={filterForm.category?.title!}
              onPress={handleOpenModalCategory}
            />
          </MainContainer>
        </RowContainerBeetwen>
      </MainContainer>

      <CitiesModal modalizeRef={citiesModalRef} />
      <CategoriesModal modalizeRef={categoriesModalRef} />
    </ColumnContainerFlex>
  );
};
