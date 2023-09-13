import React, {useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {
  changeRegisterForm,
  selectAuthValues,
} from '../../../modules/auth/AuthSlice';
import {MainContainer} from '../../../template/containers/MainContainer';
import {InputUI} from '../../../template/ui/InputUI';
import {RegisterFormKeys} from '../../../modules/auth/form/RegisterForm';
import {InputSelectUI} from '../../../template/ui/InputSelectUI';
import {PhoneIcon} from '../../../template/icons/PhoneIcon';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {LocationIcon} from '../../../template/icons/LocationIcon';
import {ProfileIcon} from '../../../template/icons/ProfileIcon';
import {CitiesModal} from '../../../components/CitiesModal';
import {Modalize} from 'react-native-modalize';
import {MaskHelper} from '../../../helper/MaskHelper';

export const RegisterContent = () => {
  const {registerForm} = useAppSelector(selectAuthValues);
  const dispatch = useAppDispatch();

  const cityModal = useRef<Modalize>(null);

  const handleOpenModal = () => {
    cityModal.current?.open();
  };

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
          onPress={handleOpenModal}
        />
      </MainContainer>

      <MainContainer $mb={10}>
        <InputUI
          placeholder={'+7 ('}
          value={MaskHelper.formatPhoneNumber(registerForm.phone_number)}
          maxLength={18}
          onChangeText={value => handleChangeForm('phone_number', value)}
          keyboardType={'number-pad'}
          leftIcon={
            <MainContainer $mr={10}>
              <PhoneIcon color={ColorsUI.black} size={20} />
            </MainContainer>
          }
        />
      </MainContainer>

      <CitiesModal
        modalizeRef={cityModal}
        onPickCity={city => handleChangeForm('city', city)}
      />
    </>
  );
};
