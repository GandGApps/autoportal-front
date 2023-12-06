import React, {useEffect, useRef, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {Modalize} from 'react-native-modalize';
import {CitiesModal} from '../../../components/CitiesModal';
import {RowContainerBeetwen} from '../../../template/containers/RowContainer';
import {BackBtn} from '../../../template/ui/BackBtn';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MainContainer} from '../../../template/containers/MainContainer';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {InputUI} from '../../../template/ui/InputUI';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {
  resetFilterForm,
  selectOrganizationsValues,
  setOrganizationList,
} from '../../../modules/organizations/OrganizationsSlice';
import {SelectUI} from '../../../template/ui/SelectUI';
import {FilterIcon} from '../../../template/icons/FilterIcon';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {CategoriesModal} from '../../../components/CategoriesModal';
import {getOrganizationList} from '../../../modules/organizations/_thunks';
import {ScrollViewScreen} from '../../../template/containers/ScrollViewScreen';
import {OrganizationItem} from './components/OrganizationItem';
import {CenterContainerFlex} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';
import {useDebouncedEffect} from '../../../template/hooks/useDebouncedEffect';
import {OrganizationList} from '../../../modules/organizations/models/OrganizationList';

export const CatOrganizationsScreens = () => {
  const {filterForm, organizationList, isOrganizationListLoad} = useAppSelector(
    selectOrganizationsValues,
  );

  const dispatch = useAppDispatch();

  const categoriesModalRef = useRef<Modalize>(null);
  const citiesModalRef = useRef<Modalize>(null);

  const insets = useSafeAreaInsets();

  const [search, setSearch] = useState('');

  const [isLoad, setIsLoad] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getOrganizationList()).finally(() => {
        setIsLoad(false);
        setIsReady(true);
      });
    }, 0);
  }, []);

  useDebouncedEffect(
    async () => {
      if (isLoad || !isReady) {
        return;
      }
      setIsLoad(true);

      dispatch(getOrganizationList())
        .then(res => {
          if (res.payload) {
            const filter = (res.payload as OrganizationList[]).filter(item =>
              item.name.toLowerCase().includes(search.toLowerCase()),
            );

            dispatch(setOrganizationList(filter));
          }
        })
        .finally(() => {
          setIsLoad(false);
        });
    },
    500,
    [search],
  );

  const handleResetFilter = () => {
    dispatch(resetFilterForm());

    setIsLoad(true);
    dispatch(getOrganizationList()).finally(() => {
      setIsLoad(false);
    });
  };

  const handleGoToFilter = () => {
    Navigation.navigate(Screens.CAT_FILTER);
  };

  const handleOpenModalCategory = () => {
    categoriesModalRef.current?.open();
  };

  const handleOpenModalCity = () => {
    citiesModalRef.current?.open();
  };

  return (
    <ColumnContainerFlex $mt={Math.max(insets.top, 20)}>
      <MainContainer $ph={20} $mb={20}>
        <RowContainerBeetwen>
          <BackBtn />

          <TouchableOpacity onPress={handleResetFilter}>
            <TextUI ag={Ag['500_12']}>{'Очистить фильтр'}</TextUI>
          </TouchableOpacity>
        </RowContainerBeetwen>

        <RowContainerBeetwen $mt={20} $mb={10}>
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

        <SelectUI
          style={{marginBottom: 10}}
          text={filterForm.city}
          onPress={handleOpenModalCity}
        />
        <SelectUI
          text={filterForm.category?.title!}
          onPress={handleOpenModalCategory}
        />
      </MainContainer>

      <ScrollViewScreen
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {isLoad || isOrganizationListLoad ? (
          <CenterContainerFlex>
            <Loader size={20} />
          </CenterContainerFlex>
        ) : (
          <>
            {organizationList.map(item => (
              <OrganizationItem
                key={item._id}
                item={item}
                categoryName={filterForm.category?.title!}
              />
            ))}
          </>
        )}
      </ScrollViewScreen>

      <CategoriesModal modalizeRef={categoriesModalRef} />
      <CitiesModal modalizeRef={citiesModalRef} />
    </ColumnContainerFlex>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },
});
