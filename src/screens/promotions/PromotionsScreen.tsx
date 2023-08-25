import React, {useEffect, useRef} from 'react';
import {ColumnContainerFlex} from '../../template/containers/ColumnContainer';
import {BottomMenu} from '../../components/bottomMenu/BottomMenu';
import {ScrollViewScreen} from '../../template/containers/ScrollViewScreen';
import {useAppDispatch, useAppSelector} from '../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../modules/organizations/OrganizationsSlice';
import {GradientHeader} from '../../components/GradientHeader';
import {StatusBar} from 'react-native';
import {ColorsUI} from '../../template/styles/ColorUI';
import {RowContainerBeetwen} from '../../template/containers/RowContainer';
import {CitiesModal} from '../../components/CitiesModal';
import {CategoriesModal} from '../../components/CategoriesModal';
import {Modalize} from 'react-native-modalize';
import {MainContainer} from '../../template/containers/MainContainer';
import {SelectUI} from '../../template/ui/SelectUI';
import {getPromotionsList} from '../../modules/organizations/thunks/OrganizationsThunks';
import {PromoOrganization} from './components/_Organization';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const PromotionsScreen = () => {
  const {filterForm, promotionsList} = useAppSelector(
    selectOrganizationsValues,
  );
  const dispatch = useAppDispatch();

  const citiesModalRef = useRef<Modalize>(null);
  const categoriesModalRef = useRef<Modalize>(null);

  const insets = useSafeAreaInsets();

  const handleOpenModalCity = () => {
    citiesModalRef.current?.open();
  };
  const handleOpenModalCategory = () => {
    categoriesModalRef.current?.open();
  };

  useEffect(() => {
    dispatch(getPromotionsList());
  }, []);

  return (
    <ColumnContainerFlex>
      <StatusBar barStyle={'light-content'} backgroundColor={ColorsUI.black} />
      <GradientHeader title={'Акционные предложения'} />

      <ScrollViewScreen
        contentContainerStyle={{paddingBottom: insets.bottom + 90}}
        $pt={10}
        showsVerticalScrollIndicator={false}>
        <RowContainerBeetwen $ph={20} $mb={20}>
          <MainContainer $mt={10} $widthPRC={48}>
            <SelectUI text={filterForm.city} onPress={handleOpenModalCity} />
          </MainContainer>

          <MainContainer $mt={10} $widthPRC={48}>
            <SelectUI
              text={filterForm.category?.title || 'Все категории'}
              onPress={handleOpenModalCategory}
            />
          </MainContainer>
        </RowContainerBeetwen>

        {promotionsList.map(item => (
          <PromoOrganization
            key={`promo-${item.organization?._id}`}
            promotion={item.promo!}
            organization={item.organization!}
          />
        ))}
      </ScrollViewScreen>

      <BottomMenu />

      <CitiesModal modalizeRef={citiesModalRef} />
      <CategoriesModal modalizeRef={categoriesModalRef} />
    </ColumnContainerFlex>
  );
};
