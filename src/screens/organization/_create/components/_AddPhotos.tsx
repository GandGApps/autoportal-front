import React from 'react';
import {FileModel} from '../../../../modules/files/models/File';
import {BorderTopUI} from '../../../../template/ui/BorderTopUI';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {
  RowContainer,
  RowContainerBeetwenEnd,
} from '../../../../template/containers/RowContainer';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {
  CenterContainer,
  CenterContainerFlex,
} from '../../../../template/containers/CenterContainer';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {PhotoIcon} from '../../../../template/icons/PhotoIcon';
import {AbsoluteContainer} from '../../../../template/containers/AbsoluteContainer';
import {ScrollViewScreen} from '../../../../template/containers/ScrollViewScreen';
import {ImageUI} from '../../../../template/ui/ImageUI';
import {CloseIcon} from '../../../../template/icons/CloseIcon';

interface CreateAddPhotosProps {
  photos: FileModel[];
  onPickImages: () => void;
  onRemovePickPhoto: (value: string) => void;
}

export const CreateAddPhotos = (props: CreateAddPhotosProps) => {
  const handleRemovePickPhoto = (url: string) => {
    setTimeout(() => {
      props.onRemovePickPhoto(url);
    }, 0);
  };
  return (
    <BorderTopUI $ph={20} $pt={25} $pb={50}>
      <TextUI $mb={25} ag={Ag['600_16']}>
        {'Фотографии'}
      </TextUI>
      <RowContainer>
        <MainContainer $pr={20}>
          <MainContainer
            $br={10}
            $borderColor={ColorsUI.gray.light}
            $widthPX={90}
            $heightPX={90}>
            <ViewPress $isFlex onPress={props.onPickImages}>
              <CenterContainerFlex>
                <PhotoIcon />
              </CenterContainerFlex>
            </ViewPress>
          </MainContainer>
        </MainContainer>

        <MainContainer $isFlex $heightPX={90}>
          <AbsoluteContainer $widthPRC={100} $heightPX={90} $top={0} $left={0}>
            <ScrollViewScreen
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                width: 110 * props.photos.length,
              }}
              horizontal>
              <RowContainer>
                {props.photos.map((image, idx) => (
                  <MainContainer key={`create-photo-${idx}`}>
                    <MainContainer $widthPX={120} $heightPX={90} $mr={20}>
                      <AbsoluteContainer $widthPRC={100} $zIndex={100}>
                        <RowContainerBeetwenEnd $pt={5} $pr={5}>
                          <ViewPress
                            onPress={() => handleRemovePickPhoto(image.uri)}>
                            <CenterContainer
                              $bg={ColorsUI.white}
                              $borderColor={ColorsUI.black}
                              $widthPX={25}
                              $heightPX={25}
                              $br={25}>
                              <CloseIcon size={10} />
                            </CenterContainer>
                          </ViewPress>
                        </RowContainerBeetwenEnd>
                      </AbsoluteContainer>

                      <ImageUI $br={10} $isFlex source={{uri: image.uri}} />
                    </MainContainer>
                  </MainContainer>
                ))}
              </RowContainer>
            </ScrollViewScreen>
          </AbsoluteContainer>
        </MainContainer>
      </RowContainer>
    </BorderTopUI>
  );
};
