import React from 'react';
import {ColumnContainerBetweenFlex} from '../template/containers/ColumnContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MainContainer} from '../template/containers/MainContainer';
import {BackBtn} from '../template/ui/BackBtn';
import {ButtonUI} from '../template/ui/ButtonUI';
import {Image} from 'react-native';
import {CenterContainer} from '../template/containers/CenterContainer';
import {Ag, TextUI} from '../template/ui/TextUI';
import {ColorsUI} from '../template/styles/ColorUI';

interface QuestionModalProps {
  title: string;
  greenTitle?: string;
  info?: string;

  btnMainTitle: string;
  onMainPress: () => void;

  isSingle?: boolean;

  btnSecondTitle?: string;
  onSecondPress: () => void;
}

export const QuestionModal = (props: QuestionModalProps) => {
  const insets = useSafeAreaInsets();
  return (
    <ColumnContainerBetweenFlex $ph={20} $pt={20}>
      <MainContainer>
        <BackBtn />
      </MainContainer>

      <CenterContainer>
        <MainContainer $mb={100}>
          <Image
            style={{width: 150, height: 150}}
            resizeMode={'contain'}
            source={require('./../../assets/img/logo.png')}
          />
        </MainContainer>

        {props.title ? (
          <TextUI $mb={20} $align={'center'} ag={Ag['500_18']}>
            {props.title}
          </TextUI>
        ) : null}
        {props.greenTitle ? (
          <TextUI ag={Ag['500_18']} color={ColorsUI.green}>
            {props.greenTitle}
          </TextUI>
        ) : null}
      </CenterContainer>

      <MainContainer $mb={Math.max(insets.bottom, 20)}>
        {props.btnSecondTitle ? (
          <ButtonUI
            $mb={10}
            $type={'border'}
            title={props.btnSecondTitle}
            onPress={props.onSecondPress}
          />
        ) : null}

        <ButtonUI title={props.btnMainTitle} onPress={props.onMainPress} />
      </MainContainer>
    </ColumnContainerBetweenFlex>
  );
};
