import React, {useEffect, useState} from 'react';
import {ColumnContainerBetween} from '../../../template/containers/ColumnContainer';
import {BackBtn} from '../../../template/ui/BackBtn';
import {ButtonUI} from '../../../template/ui/ButtonUI';
import {MainContainer} from '../../../template/containers/MainContainer';
import {Insets} from '../../../template/styles/Insets';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {selectAuthValues} from '../../../modules/auth/AuthSlice';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {CenterContainer} from '../../../template/containers/CenterContainer';
import {ViewPress} from '../../../template/containers/ViewPress';
import {sendCode} from '../../../modules/auth/thunks/sendCode.thunks';
import {getCode} from '../../../modules/auth/thunks/getCode.thunks';
import {Notifications} from '../../../template/notifications/Notifications';

export const AuthCode = () => {
  const {title} = useAppSelector(selectAuthValues);
  const dispatch = useAppDispatch();

  const CELL_COUNT = 4;

  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});
  const [propsCode, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (code.length === CELL_COUNT) {
      setIsLoad(true);
      dispatch(sendCode(code)).finally(() => {
        setIsLoad(false);
      });
    }
  }, [code, dispatch]);

  const handleResendCode = () => {
    if (!isLoad) {
      Notifications.succes('Звоним Вам повторно');
      setIsLoad(true);
      setCode(''); // Reset the code input
      dispatch(getCode()).finally(() => {
        setTimeout(() => {
          setIsLoad(false);
        }, 60000);
      });
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
      <ColumnContainerBetween
        $isFlex
        $pt={20}
        $pb={Math.max(Insets.bottom, 20)}
        $ph={20}>
        <MainContainer>
          <BackBtn $mb={20} />
          <TextUI $align={'center'} ag={Ag['400_16']}>
            {title}
          </TextUI>
        </MainContainer>

        <CenterContainer>
          <MainContainer $widthPRC={70} $mb={20}>
            <CodeField
              ref={ref}
              {...propsCode}
              value={code}
              onChangeText={setCode}
              cellCount={CELL_COUNT}
              keyboardType={'number-pad'}
              textContentType={'oneTimeCode'}
              renderCell={({index, symbol, isFocused}) => (
                <CenterContainer
                  key={index}
                  $widthPX={48}
                  $heightPX={48}
                  $borderBottom={ColorsUI.black}>
                  <TextUI
                    ag={Ag['700_22']}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : '*')}
                  </TextUI>
                </CenterContainer>
              )}
            />
          </MainContainer>
        </CenterContainer>

        <CenterContainer>
          <TextUI $mb={5} ag={Ag['400_16']}>
            {'Не пришел вызов?'}
          </TextUI>
          <ViewPress disabled={isLoad} $mb={30} onPress={handleResendCode}>
            <TextUI ag={Ag['600_16']} color={isLoad ? 'gray' : ColorsUI.green}>
              {'Отправить звонок повторно'}
            </TextUI>
          </ViewPress>
        </CenterContainer>
      </ColumnContainerBetween>
    </KeyboardAwareScrollView>
  );
};
