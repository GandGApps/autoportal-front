import LinearGradient from 'react-native-linear-gradient';
import {ColorsUI} from '../template/styles/ColorUI';
import {Ag, TextUI} from '../template/ui/TextUI';
import {MainContainer} from '../template/containers/MainContainer';
import {AbsoluteContainer} from '../template/containers/AbsoluteContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform} from 'react-native';
import {RowContainer} from '../template/containers/RowContainer';
import Navigation from '../routes/navigation/Navigation';
import {BackBtn} from '../template/ui/BackBtn';

interface GradientHeaderProps {
  title: string;
  isBack?: boolean;
}

export const GradientHeader = (props: GradientHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <MainContainer>
      {Platform.OS === 'ios' ? (
        <MainContainer $pt={insets.top} $bg={ColorsUI.black} />
      ) : null}
      <LinearGradient colors={[ColorsUI.black, ColorsUI.seriy]}>
        <RowContainer $pv={20} $ph={20}>
          {props.isBack ? (
            <MainContainer $mr={20}>
              <BackBtn color={ColorsUI.white} />
            </MainContainer>
          ) : null}
          <TextUI
            $isFlex
            $align={props.isBack ? 'left' : 'center'}
            ag={Ag['600_16']}
            color={ColorsUI.white}>
            {props.title}
          </TextUI>
        </RowContainer>
      </LinearGradient>
    </MainContainer>
  );
};
