import React, {ReactNode} from 'react';
import {
  RowContainer,
  RowContainerBeetwen,
} from '../template/containers/RowContainer';
import {Ag, TextUI} from '../template/ui/TextUI';
import {RightIcon} from '../template/icons/RightIcon';
import {MainContainer} from '../template/containers/MainContainer';
import {BorderTopUI} from '../template/ui/BorderTopUI';
import {TouchableOpacity} from 'react-native';

interface ThreeMenuItemProps {
  leftIcon?: ReactNode;
  title: string;
  onPress: () => void;
}

export const ThreeMenuItem = (props: ThreeMenuItemProps) => {
  return (
    <BorderTopUI>
      <TouchableOpacity onPress={props.onPress} style={{paddingHorizontal: 20}}>
        <RowContainerBeetwen $heightPX={66}>
          <RowContainer $isFlex>
            {props.leftIcon ? (
              <MainContainer $mr={10}>{props.leftIcon}</MainContainer>
            ) : null}

            <TextUI style={{flex: 1}} ag={Ag['500_16']}>
              {props.title}
            </TextUI>
          </RowContainer>
          <RightIcon />
        </RowContainerBeetwen>
      </TouchableOpacity>
    </BorderTopUI>
  );
};
