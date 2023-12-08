import React, {useEffect, useRef, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {GradientHeader} from '../../../components/GradientHeader';
import {ViewPress} from '../../../template/containers/ViewPress';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {ColorsUI} from '../../../template/styles/ColorUI';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {CitiesModal} from '../../../components/CitiesModal';
import {Modalize} from 'react-native-modalize';
import {InputSelectUI} from '../../../template/ui/InputSelectUI';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import {MainContainer} from '../../../template/containers/MainContainer';
import {Insets} from '../../../template/styles/Insets';
import {Banner} from '../../../modules/organizations/models/Banner';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../../modules/organizations/OrganizationsSlice';
import {BannerItem} from './components/BannerItem';
import {getBanners} from '../../../modules/organizations/_thunks';
import {CenterContainerFlex} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';

function renderItem({item}: ListRenderItemInfo<Banner>) {
  return <BannerItem banner={item} />;
}

export const AdminBanners = () => {
  const {filterForm, banners} = useAppSelector(selectOrganizationsValues);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
      dispatch(getBanners()).finally(() => {
        setIsLoading(false);
      });
    }, 0);
  }, [filterForm.city]);

  const cityModal = useRef<Modalize>(null);

  const handleOpenModal = () => {
    cityModal.current?.open();
  };

  return (
    <ColumnContainerFlex>
      <GradientHeader
        isBack={true}
        title={'Баннеры'}
        rightComonent={
          <ViewPress
            $bg={ColorsUI.firm}
            $br={20}
            $ph={30}
            $pv={5}
            $mr={20}
            onPress={() => Navigation.navigate(Screens.ADMIN_CREATE_BANNER)}>
            <TextUI color={ColorsUI.black} ag={Ag['500_14']}>
              {'Создать'}
            </TextUI>
          </ViewPress>
        }
      />

      <ColumnContainerFlex $ph={20}>
        {isLoading ? (
          <CenterContainerFlex>
            <Loader size={20} />
          </CenterContainerFlex>
        ) : (
          <FlatList
            ListHeaderComponent={
              <InputSelectUI
                placeholder={'Выберите город'}
                value={filterForm.city}
                onPress={handleOpenModal}
              />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              {paddingTop: 20, paddingBottom: Insets.bottom},
              compStyles.list,
            ]}
            data={banners}
            renderItem={renderItem}
            ListEmptyComponent={
              <MainContainer>
                <TextUI ag={Ag['500_16']} $align={'center'}>
                  {'Нет активных баннеров'}
                </TextUI>
              </MainContainer>
            }
          />
        )}
      </ColumnContainerFlex>

      <CitiesModal modalizeRef={cityModal} />
    </ColumnContainerFlex>
  );
};

const compStyles = StyleSheet.create({
  list: {
    gap: 20,
  },
});
