import React, {useRef, useState} from 'react';
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
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import {MainContainer} from '../../../template/containers/MainContainer';
import {Insets} from '../../../template/styles/Insets';
import {Banner} from '../../../modules/organizations/models/Banner';
import {ImageUI} from '../../../template/ui/ImageUI';
import {useAppSelector} from '../../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../../modules/organizations/OrganizationsSlice';

function renderItem({item}: ListRenderItemInfo<Banner>) {
  const width = Dimensions.get('window').width - 40;
  const height = width / 2.5;

  return (
    <ColumnContainerFlex $widthPX={width} $heightPX={height}>
      <ImageUI $isFlex $br={10} source={{uri: item.image}} />
    </ColumnContainerFlex>
  );
}

export const AdminBanners = () => {
  const {filterForm} = useAppSelector(selectOrganizationsValues);
  const [city, setCity] = useState(filterForm.city);

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

      <ColumnContainerFlex $ph={20} $pt={20}>
        <InputSelectUI
          placeholder={'Выберите город'}
          value={city}
          onPress={handleOpenModal}
        />

        <FlatList
          contentContainerStyle={[
            {paddingTop: 20, paddingBottom: Insets.bottom},
            compStyles.list,
          ]}
          data={[]}
          renderItem={renderItem}
          ListEmptyComponent={
            <MainContainer>
              <TextUI ag={Ag['500_16']} $align={'center'}>
                {'Нет активных баннеров'}
              </TextUI>
            </MainContainer>
          }
        />
      </ColumnContainerFlex>

      <CitiesModal modalizeRef={cityModal} onPickCity={setCity} />
    </ColumnContainerFlex>
  );
};

const compStyles = StyleSheet.create({
  list: {
    gap: 20,
  },
});
