import React from 'react';
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import {Modalize, ModalizeProps} from 'react-native-modalize';
import {IHandles} from 'react-native-modalize/lib/options';
import {Portal} from 'react-native-portalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ColorsUI} from '../template/styles/ColorUI';

interface ISwipeableModalProps extends ModalizeProps {
  children: JSX.Element | JSX.Element[];
  modalizeRef: React.RefObject<IHandles>;
  fullScreen?: boolean;
  onClose?: () => void;
}

export const SwipeableModal = (props: ISwipeableModalProps) => {
  const {children, modalizeRef, fullScreen, onClose, ...otherProps} = props;

  const width = Dimensions.get('screen').width;
  const insets = useSafeAreaInsets();

  const handleModalClose = () => {
    if (onClose) {
      onClose();
    }

    modalizeRef.current?.close();
  };

  return (
    <Portal>
      <Modalize
        ref={modalizeRef}
        modalStyle={[
          fullScreen ? [styles.modal, {marginTop: insets.top}] : null,
        ]}
        withHandle={false}
        scrollViewProps={{
          horizontal: true,
          showsVerticalScrollIndicator: false,
          contentContainerStyle: fullScreen
            ? {height: '100%', paddingBottom: insets.top}
            : null,
        }}
        closeOnOverlayTap
        tapGestureEnabled
        adjustToContentHeight={true}
        disableScrollIfPossible={false}
        panGestureComponentEnabled
        onClose={() => handleModalClose}
        {...otherProps}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={ColorsUI.black}
        />
        <View style={[styles.container, {width: width}]}>{children}</View>
      </Modalize>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    minHeight: '100%',
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
