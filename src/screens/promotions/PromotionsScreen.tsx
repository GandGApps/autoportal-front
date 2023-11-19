import React, {useCallback, useRef, useState} from 'react';
import {ColumnContainerFlex} from '../../template/containers/ColumnContainer';
import {BottomMenu} from '../../components/bottomMenu/BottomMenu';
import {ScrollViewScreen} from '../../template/containers/ScrollViewScreen';
import {useAppDispatch, useAppSelector} from '../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../modules/organizations/OrganizationsSlice';
import {GradientHeader} from '../../components/GradientHeader';
import {StatusBar} from 'react-native';
import {ColorsUI} from '../../template/styles/ColorUI';
import {CitiesModal} from '../../components/CitiesModal';
import {CategoriesModal} from '../../components/CategoriesModal';
import {Modalize} from 'react-native-modalize';
import {MainContainer} from '../../template/containers/MainContainer';
import {SelectUI} from '../../template/ui/SelectUI';
import {PromoOrganization} from './components/_Organization';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getPromotionsList} from '../../modules/organizations/_thunks';
import {CenterContainerFlex} from '../../template/containers/CenterContainer';
import {Loader} from '../../components/Loader';
import {Ag, TextUI} from '../../template/ui/TextUI';
import {useFocusEffect} from '@react-navigation/native';

export const PromotionsScreen = () => {
  const {filterForm, promotionsList, isPromotionListLoad} = useAppSelector(
    selectOrganizationsValues,
  );
  const dispatch = useAppDispatch();

  const [isLoad, setIsLoad] = useState(true);

  const citiesModalRef = useRef<Modalize>(null);
  const categoriesModalRef = useRef<Modalize>(null);

  const insets = useSafeAreaInsets();

  const handleOpenModalCity = () => {
    citiesModalRef.current?.open();
  };
  const handleOpenModalCategory = () => {
    categoriesModalRef.current?.open();
  };

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        dispatch(getPromotionsList()).finally(() => {
          setIsLoad(false);
        });
      }, 0);
    }, [filterForm.category, filterForm.city]),
  );

  return (
    <ColumnContainerFlex>
      <StatusBar barStyle={'light-content'} backgroundColor={ColorsUI.black} />
      <GradientHeader title={'Акционные предложения'} />

      <ScrollViewScreen
        contentContainerStyle={{paddingBottom: insets.bottom + 90}}
        $pt={10}
        showsVerticalScrollIndicator={false}>
        <MainContainer $ph={20} $mt={10} $widthPRC={100}>
          <SelectUI text={filterForm.city} onPress={handleOpenModalCity} />
        </MainContainer>

        <MainContainer $ph={20} $mt={10} $mb={20} $widthPRC={100}>
          <SelectUI
            text={filterForm.category?.title || 'Все категории'}
            onPress={handleOpenModalCategory}
          />
        </MainContainer>
        {isLoad || isPromotionListLoad ? (
          <CenterContainerFlex>
            <Loader size={20} />
          </CenterContainerFlex>
        ) : (
          <>
            {promotionsList.map((item, index) => (
              <PromoOrganization
                key={`promo-${item.organization?._id}-${index}`}
                promotion={item.promotion!}
                organization={item.organization!}
              />
            ))}

            {!promotionsList.length ? (
              <TextUI $align={'center'} ag={Ag['400_16']}>
                {'Нет организаций с акциями'}
              </TextUI>
            ) : null}
          </>
        )}
      </ScrollViewScreen>
      <BottomMenu />

      <CitiesModal modalizeRef={citiesModalRef} />
      <CategoriesModal modalizeRef={categoriesModalRef} />
    </ColumnContainerFlex>
  );
};
