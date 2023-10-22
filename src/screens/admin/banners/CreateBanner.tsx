import React, {Fragment, useRef, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {GradientHeader} from '../../../components/GradientHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Insets} from '../../../template/styles/Insets';
import {Platform, StyleSheet} from 'react-native';
import {MainContainer} from '../../../template/containers/MainContainer';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {ViewPress} from '../../../template/containers/ViewPress';
import {CenterContainerFlex} from '../../../template/containers/CenterContainer';
import {PhotoIcon} from '../../../template/icons/PhotoIcon';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {InputSelectUI} from '../../../template/ui/InputSelectUI';
import {InputUI} from '../../../template/ui/InputUI';
import {CitiesModal} from '../../../components/CitiesModal';
import {Modalize} from 'react-native-modalize';
import {FileHelper} from '../../../modules/files/FilesHelper';
import {Asset} from 'react-native-image-picker';
import {Nullable} from '../../../settings/types/BaseTypes';
import {ImageUI} from '../../../template/ui/ImageUI';

export const CreateBanner = () => {
  const [city, setCity] = useState('');
  const [image, setImage] = useState<Nullable<Asset>>(null);

  const cityModal = useRef<Modalize>(null);

  const handleOpenModal = () => {
    cityModal.current?.open();
  };

  const handlePickImages = async () => {
    const res = await FileHelper.pickFile({
      limit: 1,
    });

    if (res && res.length) {
      res.map(image => {
        setImage(image);
      });
    }
  };

  return (
    <ColumnContainerFlex>
      <GradientHeader isBack={true} title={'Добавление баннера'} />
      <KeyboardAwareScrollView
        enableOnAndroid={Platform.OS === 'android'}
        extraHeight={200}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          paddingTop: 20,
          paddingBottom: Math.max(Insets.bottom, 20),
          paddingHorizontal: 20,
          gap: 20,
        }}
        enableResetScrollToCoords={false}
        stickyHeaderHiddenOnScroll={false}>
        <MainContainer
          $br={10}
          $borderColor={ColorsUI.gray.light}
          $widthPRC={100}
          $heightPX={135}>
          <ViewPress $isFlex onPress={handlePickImages}>
            <CenterContainerFlex style={compStyles.gap10}>
              {image ? (
                <ImageUI
                  $br={10}
                  $widthPRC={100}
                  $heightPX={135}
                  source={{uri: image.uri}}
                />
              ) : (
                <Fragment>
                  <PhotoIcon />
                  <TextUI color={ColorsUI.gray.main} ag={Ag['400_16']}>
                    {'Нажмите, чтобы загрузить баннер'}
                  </TextUI>
                </Fragment>
              )}
            </CenterContainerFlex>
          </ViewPress>
        </MainContainer>

        <InputSelectUI
          placeholder={'Выберите город'}
          value={city}
          onPress={handleOpenModal}
        />

        <InputUI placeholder={'Название баннера'} />

        <InputUI placeholder={'ID организации'} />
      </KeyboardAwareScrollView>

      <CitiesModal modalizeRef={cityModal} onPickCity={setCity} />
    </ColumnContainerFlex>
  );
};

const compStyles = StyleSheet.create({
  gap10: {
    gap: 10,
  },
});
