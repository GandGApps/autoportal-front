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
import {getSearchServices} from '../../../modules/organizations/_thunks';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {CenterContainerFlex} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';
import {SearchServices} from '../../../modules/organizations/models/SearchServices';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';

export const CatSearchScreen = () => {
  const {searchServices, categories, isSearchLoad} = useAppSelector(
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
    dispatch(
      filterChangeForm({
        key: 'category',
        value: categories.find(item => item._id === value.categoryId)!,
      }),
    );
    dispatch(filterChangeForm({key: 'typeService', value: [value.service_id]}));

    Navigation.navigate(Screens.CAT_ORGANIZATIONS);
  };

  return (
    <ColumnContainerFlex $ph={20} $pt={Math.max(insets.top, 20)}>
      <BackBtn $mb={10} />

      <InputUI
        containerStyles={{
          $mb: 25,
        }}
        value={search}
        onChangeText={setSearch}
        placeholder={search || 'Поиск по услугам'}
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
          <>
            {searchServices.map((item, index) => (
              <BorderTopUI key={`search-${item.service_id}-${index}`}>
                <TouchableOpacity onPress={() => handleSelectService(item)}>
                  <MainContainer $pv={15} $pl={8}>
                    <TextUI ag={Ag['400_16']}>{item.title}</TextUI>
                  </MainContainer>
                </TouchableOpacity>
              </BorderTopUI>
            ))}

            {!searchServices.length ? (
              <TextUI ag={Ag['400_16']}>
                {'По вашему запросу услуга не найдена'}
              </TextUI>
            ) : null}
          </>
        )}
      </ScrollViewScreen>
    </ColumnContainerFlex>
  );
};
