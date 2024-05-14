import React from 'react';
import {InputUI} from '../../../template/ui/InputUI';
import {MainContainer} from '../../../template/containers/MainContainer';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {
  changeLoginForm,
  selectAuthValues,
} from '../../../modules/auth/AuthSlice';
import {LoginFormKeys} from '../../../modules/auth/form/LoginForm';
import {MaskHelper} from '../../../helper/MaskHelper';
import {PhoneIcon} from '../../../template/icons/PhoneIcon';
import {ColorsUI} from '../../../template/styles/ColorUI';

export const LoginContent = () => {
  const {loginForm} = useAppSelector(selectAuthValues);
  const dispatch = useAppDispatch();

  const handleChangeForm = (key: LoginFormKeys, value: string) => {
    dispatch(changeLoginForm({key, value}));
  };

  return (
    <>
      <InputUI
        defaultValue="+7 ("
        placeholder={'+7 ('}
        value={MaskHelper.formatPhoneNumber(loginForm.phone_number)}
        onChangeText={value => handleChangeForm('phone_number', value)}
        maxLength={18}
        keyboardType={'number-pad'}
        leftIcon={
          <MainContainer $mr={10}>
            <PhoneIcon color={ColorsUI.black} size={20} />
          </MainContainer>
        }
      />
    </>
  );
};
