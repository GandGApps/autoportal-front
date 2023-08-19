import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {InputUI} from '../../../template/ui/InputUI';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BackBtn} from '../../../template/ui/BackBtn';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {MainContainer} from '../../../template/containers/MainContainer';
import {BorderTopUI} from '../../../template/ui/BorderTopUI';
import {ScrollViewScreen} from '../../../template/containers/ScrollViewScreen';
import {useDebouncedEffect} from '../../../template/hooks/useDebouncedEffect';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {
  filterChangeForm,
  selectOrganizationsValues,
} from '../../../modules/organizations/OrganizationsSlice';
import {getSearchServices} from '../../../modules/organizations/thunks/OrganizationsThunks';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {CenterContainerFlex} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';
import {SearchServices} from '../../../modules/organizations/models/SearchServices';
import {Category} from '../../../modules/organizations/models/Category';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';

export const CatSearchScreen = () => {
  const {searchServices, isSearchLoad} = useAppSelector(
    selectOrganizationsValues,
  );

  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();

  const [search, setSearch] = useState('');

  useDebouncedEffect(
    () => {
      dispatch(getSearchServices(search));
    },
    500,
    [search],
  );

  useFocusEffect(
    useCallback(() => {
      if (!search.length) {
        console.log(search);
        console.log('test');
        dispatch(getSearchServices(''));
      }
    }, [search]),
  );

  const handleChangeText = (value: string) => {
    if (isSearchLoad) {
      return;
    }

    setSearch(value);
  };

  const handleSelectService = (value: SearchServices) => {
    dispatch(filterChangeForm({key: 'category', value: value.category}));
    dispatch(filterChangeForm({key: 'typeService', value: [value._id]}));

    Navigation.navigate(Screens.CAT_ORGANIZATIONS);
  };

  return (
    <ColumnContainerFlex $ph={20} $pt={Math.max(insets.top, 20)}>
      <BackBtn $mb={10} />

      <InputUI
        containerStyles={{
          $mb: 25,
        }}
        onChangeText={handleChangeText}
        placeholder={search || 'Поиск по названию и услуге'}
      />

      {searchServices.length ? (
        <MainContainer $pl={8} $mb={10}>
          <TextUI ag={Ag['500_16']}>{'Рекомендации'}</TextUI>
        </MainContainer>
      ) : null}

      <ScrollViewScreen>
        {isSearchLoad ? (
          <CenterContainerFlex>
            <Loader size={20} />
          </CenterContainerFlex>
        ) : (
          searchServices.map(item => (
            <BorderTopUI key={`search-${item._id}`}>
              <TouchableOpacity onPress={() => handleSelectService(item)}>
                <MainContainer $pv={15} $pl={8}>
                  <TextUI ag={Ag['400_16']}>{item.title}</TextUI>
                  <TextUI ag={Ag['400_12']}>{item.category?.title}</TextUI>
                </MainContainer>
              </TouchableOpacity>
            </BorderTopUI>
          ))
        )}
      </ScrollViewScreen>
    </ColumnContainerFlex>
  );
};
