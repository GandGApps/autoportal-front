import React, {useEffect, useRef} from 'react';
import {ColumnContainerFlex} from '../../template/containers/ColumnContainer';
import {BottomMenu} from '../../components/bottomMenu/BottomMenu';
import {GradientHeader} from '../../components/GradientHeader';
import {StatusBar} from 'react-native';
import {ColorsUI} from '../../template/styles/ColorUI';
import {ScrollViewScreen} from '../../template/containers/ScrollViewScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SelectUI} from '../../template/ui/SelectUI';
import {useAppDispatch, useAppSelector} from '../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../modules/organizations/OrganizationsSlice';
import {CategoriesModal} from '../../components/CategoriesModal';
import {Modalize} from 'react-native-modalize';
import {InputSelectUI} from '../../template/ui/InputSelectUI';
import {DownIcon} from '../../template/icons/DownIcon';
import {MainContainer} from '../../template/containers/MainContainer';
import {getFavoritesList} from '../../modules/organizations/thunks/OrganizationsThunks';
import {OrganizationItem} from '../categories/_organizations/components/OrganizationItem';

export const FavoritesScreen = () => {
  const {filterForm, favoritesList} = useAppSelector(selectOrganizationsValues);
  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();

  const categoriesModalRef = useRef<Modalize>(null);

  useEffect(() => {
    dispatch(getFavoritesList());
  }, []);

  const handleOpenModalCategory = () => {
    categoriesModalRef.current?.open();
  };

  return (
    <ColumnContainerFlex>
      <StatusBar barStyle={'light-content'} backgroundColor={ColorsUI.black} />
      <GradientHeader title={'Избранное'} />

      <ScrollViewScreen
        contentContainerStyle={{paddingBottom: insets.bottom + 90}}
        $pt={10}
        showsVerticalScrollIndicator={false}>
        <MainContainer $ph={20} $mb={20}>
          <InputSelectUI
            onPress={handleOpenModalCategory}
            value={filterForm.category?.title || 'Все категории'}
            rightIcon={<DownIcon />}
          />
        </MainContainer>

        {favoritesList.map(item => (
          <OrganizationItem key={`fav-${item._id}`} item={item} />
        ))}
      </ScrollViewScreen>

      <BottomMenu />

      <CategoriesModal modalizeRef={categoriesModalRef} />
    </ColumnContainerFlex>
  );
};
