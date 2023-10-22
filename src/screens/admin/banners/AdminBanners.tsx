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
import {FlatList} from 'react-native';
import {MainContainer} from '../../../template/containers/MainContainer';
import {Insets} from '../../../template/styles/Insets';

export const AdminBanners = () => {
  const [city, setCity] = useState('');

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
          contentContainerStyle={{paddingTop: 20, paddingBottom: Insets.bottom}}
          data={[]}
          renderItem={({item}) => <></>}
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
