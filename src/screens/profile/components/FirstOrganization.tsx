import React from 'react';
import {MainContainer} from '../../../template/containers/MainContainer';
import LinearGradient from 'react-native-linear-gradient';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {AbsoluteContainer} from '../../../template/containers/AbsoluteContainer';
import {ViewPress} from '../../../template/containers/ViewPress';
import {BorderTopUI} from '../../../template/ui/BorderTopUI';
import {ColorsUI} from '../../../template/styles/ColorUI';

export const FirstOrganization = () => {
  return (
    <MainContainer $mt={1}>
      <LinearGradient colors={[ColorsUI.black, ColorsUI.seriy]}>
        <MainContainer $pt={20} $pb={35} $ph={20}>
          <TextUI ag={Ag['400_14']} color={ColorsUI.white}>
            {
              'Вы можете создать организацию на нашей\nплатформе, чтобы генерировать клиентов '
            }
          </TextUI>

          <AbsoluteContainer $bottom={10} $right={10}>
            <ViewPress>
              <TextUI ag={Ag['500_12']} color={ColorsUI.firm}>
                {'Создать'}
              </TextUI>
              <BorderTopUI $colorLine={ColorsUI.firm} />
            </ViewPress>
          </AbsoluteContainer>
        </MainContainer>
      </LinearGradient>
    </MainContainer>
  );
};
