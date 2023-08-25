import LinearGradient from 'react-native-linear-gradient';
import {ColorsUI} from '../template/styles/ColorUI';
import {Ag, TextUI} from '../template/ui/TextUI';
import {MainContainer} from '../template/containers/MainContainer';
import {AbsoluteContainer} from '../template/containers/AbsoluteContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform} from 'react-native';

interface GradientHeaderProps {
  title: string;
}

export const GradientHeader = (props: GradientHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <MainContainer>
      {Platform.OS === 'ios' ? (
        <MainContainer $pt={insets.top} $bg={ColorsUI.black} />
      ) : null}
      <LinearGradient colors={[ColorsUI.black, ColorsUI.seriy]}>
        <MainContainer $pv={20}>
          <TextUI $align={'center'} ag={Ag['600_16']} color={ColorsUI.white}>
            {props.title}
          </TextUI>
        </MainContainer>
      </LinearGradient>
    </MainContainer>
  );
};
