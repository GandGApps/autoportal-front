import React from 'react';
import {ViewPress} from '../template/containers/ViewPress';
import {RowContainer} from '../template/containers/RowContainer';
import {MainContainer} from '../template/containers/MainContainer';
import {Ag, TextUI} from '../template/ui/TextUI';
import {BorderTopUI} from '../template/ui/BorderTopUI';
import {ColorsUI} from '../template/styles/ColorUI';
import {ContainerProps} from '../template/ui-types/UITypes';

interface UnderLineText extends ContainerProps {
  text: string;
  colorText?: string;
  colorLine?: string;
}

export const UnderLineText = (props: UnderLineText) => {
  return (
    <ViewPress {...props}>
      <RowContainer>
        <MainContainer>
          <TextUI color={props.colorText} ag={Ag['400_12']}>
            {props.text}
          </TextUI>
          <BorderTopUI $colorLine={props.colorLine || ColorsUI.black} />
        </MainContainer>
      </RowContainer>
    </ViewPress>
  );
};
