import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ColumnContainerFlex} from '../../template/containers/ColumnContainer';
import {BottomMenu} from '../../components/bottomMenu/BottomMenu';
import {GradientHeader} from '../../components/GradientHeader';
import {StatusBar} from 'react-native';
import {ColorsUI} from '../../template/styles/ColorUI';
import {ScrollViewScreen} from '../../template/containers/ScrollViewScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../modules/organizations/OrganizationsSlice';
import {CategoriesModal} from '../../components/CategoriesModal';
import {Modalize} from 'react-native-modalize';
import {InputSelectUI} from '../../template/ui/InputSelectUI';
import {DownIcon} from '../../template/icons/DownIcon';
import {MainContainer} from '../../template/containers/MainContainer';
import {OrganizationItem} from '../organization/_cat_list/components/OrganizationItem';
import {getFavoritesList} from '../../modules/organizations/_thunks';
import {CenterContainer} from '../../template/containers/CenterContainer';
import {Loader} from '../../components/Loader';
import {Ag, TextUI} from '../../template/ui/TextUI';
import {useFocusEffect} from '@react-navigation/native';

export const FavoritesScreen = () => {
  const {filterForm, favoritesList, isFavoritesListLoad} = useAppSelector(
    selectOrganizationsValues,
  );

  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();

  console.log('favorite List', favoritesList)

  const categoriesModalRef = useRef<Modalize>(null);

  const [isLoad, setIsLoad] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        dispatch(getFavoritesList()).finally(() => {
          setIsLoad(false);
        });
      }, 0);
    }, [filterForm.category]),
  ); 

  const handleOpenModalCategory = () => {
    categoriesModalRef.current?.open();
  };

  return (
    <ColumnContainerFlex>
      <StatusBar barStyle={'light-content'} backgroundColor={ColorsUI.black} />
      <GradientHeader title={'Избранное'} />

      <ScrollViewScreen
        contentContainerStyle={{paddingBottom: insets.bottom + 90}}
        $pt={20}
        showsVerticalScrollIndicator={false}>
        <MainContainer $ph={20} $mb={20}>
          <InputSelectUI
            onPress={handleOpenModalCategory}
            value={filterForm.category?.title || 'Все категории'}
            rightIcon={<DownIcon />}
          />
        </MainContainer>

        {isFavoritesListLoad || isLoad ? (
          <CenterContainer>
            <Loader size={20} />
          </CenterContainer>
        ) : (
          <>
            {!favoritesList.length ? (
              <TextUI $align={'center'} ag={Ag['600_16']}>
                {'Нет избранных'}
              </TextUI>
            ) : null}
            {favoritesList.map(item => (
              <OrganizationItem
                key={`fav-${item._id}`}
                item={item.organisation_id!}
                categoryName={filterForm.category?.title!}
              />
            ))}
          </>
        )}
      </ScrollViewScreen>

      <BottomMenu />

      <CategoriesModal modalizeRef={categoriesModalRef} />
    </ColumnContainerFlex>
  );
};
