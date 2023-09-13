import React, {useEffect, useRef, useState} from 'react';
import {
  ColumnContainerBetweenFlex,
  ColumnContainerFlex,
} from '../../../template/containers/ColumnContainer';
import {GradientHeader} from '../../../components/GradientHeader';
import {MainContainer} from '../../../template/containers/MainContainer';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {
  changeEditForm,
  selectUserValues,
  setDefaultEditForm,
} from '../../../modules/user/UserSlice';
import {MaskHelper} from '../../../helper/MaskHelper';
import {BorderTopUI} from '../../../template/ui/BorderTopUI';
import {ButtonUI} from '../../../template/ui/ButtonUI';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {InputUI} from '../../../template/ui/InputUI';
import {InputSelectUI} from '../../../template/ui/InputSelectUI';
import {
  EditFormKeys,
  isEditFormValid,
  isEmailValid,
  isNewEditValue,
} from '../../../modules/user/form/UserEditForm';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {CitiesModal} from '../../../components/CitiesModal';
import {Modalize} from 'react-native-modalize';
import {RowContainerBeetwenEnd} from '../../../template/containers/RowContainer';
import {ViewPress} from '../../../template/containers/ViewPress';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';

export const EditScreen = () => {
  const {userInfo, isUserInfoLoad, editForm} = useAppSelector(selectUserValues);
  const dispatch = useAppDispatch();

  const [isError, setIsError] = useState(false);

  const citiesModalRef = useRef<Modalize>(null);

  const handleOpenModalCity = () => {
    citiesModalRef.current?.open();
  };

  useEffect(() => {
    dispatch(
      setDefaultEditForm({
        city: userInfo?.city!,
        fullName: userInfo?.full_Name!,
        phone: MaskHelper.formatPhoneNumber(userInfo?.phone_number)!,
        email: userInfo?.email!,
      }),
    );
  }, []);

  const insets = useSafeAreaInsets();

  const handleChangeEditForm = (key: EditFormKeys, value: string) => {
    setIsError(false);
    dispatch(changeEditForm({key, value}));
  };

  const handleChangeCity = (city: string) => {
    handleChangeEditForm('city', city);
  };

  const handleSaveChange = () => {
    if (!isEditFormValid(editForm)) {
      setIsError(true);
      return;
    }

    setIsError(false);
  };

  const handleGoToRecovery = () => {
    Navigation.navigate(Screens.RECOVERY_MODAL);
  };

  return (
    <ColumnContainerFlex>
      <GradientHeader isBack title="Мои данные" />

      <ColumnContainerBetweenFlex>
        <MainContainer $ph={20} $pv={30}>
          <TextUI $mb={20} ag={Ag['400_16']}>
            {`ID: ${userInfo?._id}`}
          </TextUI>

          <MainContainer $mb={20}>
            <InputSelectUI
              value={editForm.city}
              onPress={handleOpenModalCity}
            />
          </MainContainer>

          <MainContainer $mb={20}>
            <InputUI
              placeholder="Ф.И.О"
              value={editForm.fullName}
              onChangeText={fullName =>
                handleChangeEditForm('fullName', fullName)
              }
            />

            {isError && editForm.fullName.length < 6 ? (
              <MainContainer $mt={5}>
                <TextUI ag={Ag['500_12']} color={ColorsUI.red}>
                  {'Минимум 6 символов'}
                </TextUI>
              </MainContainer>
            ) : null}
          </MainContainer>

          <MainContainer $mb={20}>
            <InputUI
              placeholder="Номер телефона"
              value={MaskHelper.formatPhoneNumber(editForm.phone)}
              onChangeText={phone => handleChangeEditForm('phone', phone)}
              keyboardType={'number-pad'}
            />

            {isError && editForm.phone.length !== 18 ? (
              <MainContainer $mt={5}>
                <TextUI ag={Ag['500_12']} color={ColorsUI.red}>
                  {'Некорректный номер'}
                </TextUI>
              </MainContainer>
            ) : null}
          </MainContainer>

          <MainContainer $mb={10}>
            <InputUI
              placeholder="Почта"
              value={editForm.email}
              onChangeText={email => handleChangeEditForm('email', email)}
            />

            {isError && !isEmailValid(editForm.email) ? (
              <MainContainer $mt={5}>
                <TextUI ag={Ag['500_12']} color={ColorsUI.red}>
                  {'Такой почты не существует'}
                </TextUI>
              </MainContainer>
            ) : null}
          </MainContainer>

          <RowContainerBeetwenEnd>
            <ViewPress onPress={handleGoToRecovery}>
              <TextUI ag={Ag['600_14']}>{'Забыли пароль?'}</TextUI>
            </ViewPress>
          </RowContainerBeetwenEnd>
        </MainContainer>

        <BorderTopUI $ph={20} $pt={20} $mb={Math.max(insets.bottom, 20)}>
          <ButtonUI
            onPress={handleSaveChange}
            $btnDisabled={!isNewEditValue(userInfo!, editForm)}
            title="Сохранить"
          />
        </BorderTopUI>
      </ColumnContainerBetweenFlex>

      <CitiesModal modalizeRef={citiesModalRef} onPickCity={handleChangeCity} />
    </ColumnContainerFlex>
  );
};
