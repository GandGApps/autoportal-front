import LinearGradient from 'react-native-linear-gradient';
import {ColorsUI} from '../template/styles/ColorUI';
import {Ag, TextUI} from '../template/ui/TextUI';
import {MainContainer} from '../template/containers/MainContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform} from 'react-native';
import {
  RowContainer,
  RowContainerBeetwen,
} from '../template/containers/RowContainer';
import {BackBtn} from '../template/ui/BackBtn';
import {ReactNode} from 'react';

interface GradientHeaderProps {
  title: string;
  isBack?: boolean;
  rightComonent?: ReactNode;
}

export const GradientHeader = (props: GradientHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <MainContainer>
      {Platform.OS === 'ios' ? (
        <MainContainer $pt={insets.top} $bg={ColorsUI.black} />
      ) : null}
      <LinearGradient colors={[ColorsUI.black, ColorsUI.seriy]}>
        <RowContainerBeetwen>
          <RowContainer $pv={20} $ph={20}>
            {props.isBack ? (
              <MainContainer $mr={20}>
                <BackBtn color={ColorsUI.white} />
              </MainContainer>
            ) : null}
            <TextUI
              $isFlex={!props.isBack}
              $align={props.isBack ? 'left' : 'center'}
              ag={Ag['600_16']}
              color={ColorsUI.white}>
              {props.title}
            </TextUI>
          </RowContainer>
          {props.rightComonent ? props.rightComonent : null}
        </RowContainerBeetwen>
      </LinearGradient>
    </MainContainer>
  );
};
