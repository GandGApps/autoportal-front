import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {
  changeRegisterForm,
  selectAuthValues,
} from '../../../modules/auth/AuthSlice';
import {MainContainer} from '../../../template/containers/MainContainer';
import {InputUI} from '../../../template/ui/InputUI';
import {RegisterFormKeys} from '../../../modules/auth/form/RegisterForm';
import {EmailIcon} from '../../../template/icons/EmailIcon';
import {PasswordIcon} from '../../../template/icons/PasswordIcon';
import {InputSelectUI} from '../../../template/ui/InputSelectUI';
import {PhoneIcon} from '../../../template/icons/PhoneIcon';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {LocationIcon} from '../../../template/icons/LocationIcon';
import {ProfileIcon} from '../../../template/icons/ProfileIcon';

export const RegisterContent = () => {
  const {registerForm} = useAppSelector(selectAuthValues);
  const dispatch = useAppDispatch();

  const handleChangeForm = (key: RegisterFormKeys, value: string) => {
    dispatch(changeRegisterForm({key, value}));
  };

  return (
    <>
      <MainContainer $mb={10}>
        <InputUI
          placeholder={'Имя Фамилия'}
          value={registerForm.full_name}
          onChangeText={value => handleChangeForm('full_name', value)}
          leftIcon={
            <MainContainer $mr={10}>
              <ProfileIcon size={20} />
            </MainContainer>
          }
        />
      </MainContainer>
      <MainContainer $mb={10}>
        <InputSelectUI
          isSelect
          styleP={{$isFlex: true}}
          placeholder="Город"
          value={registerForm.city}
          leftIcon={
            <MainContainer $mr={10}>
              <LocationIcon size={20} color={ColorsUI.black} />
            </MainContainer>
          }
        />
      </MainContainer>

      <MainContainer $mb={10}>
        <InputUI
          secureTextEntry
          placeholder={'Телефон'}
          value={registerForm.phone_number}
          onChangeText={value => handleChangeForm('phone_number', value)}
          leftIcon={
            <MainContainer $mr={10}>
              <PhoneIcon color={ColorsUI.black} size={20} />
            </MainContainer>
          }
        />
      </MainContainer>
    </>
  );
};
