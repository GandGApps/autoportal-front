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
  logo: string;
  onPickImage: () => void;
}

export const CreateAddLogo = (props: CreateAddLogoProps) => {
  return (
    <BorderTopUI $bg={ColorsUI.gray.second} $pt={15} $pb={15} $ph={20}>
      <TextUI $mb={25} ag={Ag['600_16']}>
        {'Логотип'}
      </TextUI>

      <CenterContainer $mb={10}>
        <MainContainer $widthPX={100} $heightPX={100}>
          <ViewPress $isFlex onPress={props.onPickImage}>
            {props.logo ? (
              <ImageUI $isFlex $br={100} source={{uri: props.logo}} />
            ) : (
              <CenterContainerFlex
                $br={50}
                $borderColor={ColorsUI.gray.line}
                $bg={ColorsUI.white}>
                <MainContainer $mb={5}>
                  <PhotoIcon />
                </MainContainer>
              </CenterContainerFlex>
            )}
          </ViewPress>
        </MainContainer>
      </CenterContainer>

      <TextUI ag={Ag['400_12']} $align={'center'}>
        {'Добавьте фотографию\nили логотип '}
      </TextUI>
    </BorderTopUI>
  );
};
