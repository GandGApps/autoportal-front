import React from 'react';
import {BorderTopUI} from '../../../../template/ui/BorderTopUI';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {
  CenterContainer,
  CenterContainerFlex,
} from '../../../../template/containers/CenterContainer';
import {ImageUI} from '../../../../template/ui/ImageUI';
import {FileModel} from '../../../../modules/files/models/File';
import {Nullable} from '../../../../settings/types/BaseTypes';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {PhotoIcon} from '../../../../template/icons/PhotoIcon';
import {Ag, TextUI} from '../../../../template/ui/TextUI';

interface CreateAddLogoProps {
  logo: Nullable<FileModel>;
}

export const CreateAddLogo = (props: CreateAddLogoProps) => {
  return (
    <BorderTopUI $bg={ColorsUI.gray.second} $pt={25} $pb={50} $ph={20}>
      <TextUI $mb={25} ag={Ag['600_16']}>
        {'Логотип'}
      </TextUI>

      <CenterContainer>
        <MainContainer
          $widthPX={160}
          $heightPX={160}
          $br={8}
          $borderColor={ColorsUI.black}
          $bg={ColorsUI.gray.disabled}>
          <ViewPress $isFlex activeOpacity={0.8}>
            {props.logo ? (
              <ImageUI $isFlex $br={150} source={{uri: props.logo.uri}} />
            ) : (
              <CenterContainerFlex $br={150} $bg={ColorsUI.white}>
                <MainContainer $mb={5}>
                  <PhotoIcon />
                </MainContainer>

                <TextUI ag={Ag['400_12']} $align={'center'}>
                  {'Добавьте фотографию\nили логотип '}
                </TextUI>
              </CenterContainerFlex>
            )}
          </ViewPress>
        </MainContainer>
      </CenterContainer>
    </BorderTopUI>
  );
};
