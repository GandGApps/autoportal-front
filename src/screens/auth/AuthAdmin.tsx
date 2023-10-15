import React, {useState} from 'react';
import {ColumnContainerFlex} from '../../template/containers/ColumnContainer';
import {MainContainer} from '../../template/containers/MainContainer';
import {InputUI} from '../../template/ui/InputUI';
import {StyleSheet} from 'react-native';
import {Ag, TextUI} from '../../template/ui/TextUI';
import {ButtonUI} from '../../template/ui/ButtonUI';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch} from '../../settings/redux/hooks';
import {adminLogin} from '../../modules/auth/thunks/adminLogin.thunk';

export const AuthAdmin = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const handleAdminLogin = () => {
    setIsLoading(true);
    dispatch(adminLogin(password)).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <ColumnContainerFlex
      $pt={20}
      $ph={20}
      style={[compStyles.container, {paddingBottom: insets.bottom}]}>
      <TextUI ag={Ag['500_16']}>
        {'Вы авторизовываетесь под особой ролью, пожалуйста укажите пароль'}
      </TextUI>
      <InputUI
        placeholder={'Пароль'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <ColumnContainerFlex />
      <ButtonUI
        $btnDisabled={isLoading}
        title={'Войти'}
        onPress={handleAdminLogin}
      />
    </ColumnContainerFlex>
  );
};

const compStyles = StyleSheet.create({
  container: {
    gap: 20,
  },
});
