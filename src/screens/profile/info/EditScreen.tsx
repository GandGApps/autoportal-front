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
import {BorderTopUI} from '../../../template/ui/BorderTopUI';
import {ButtonUI} from '../../../template/ui/ButtonUI';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {InputUI} from '../../../template/ui/InputUI';
import {InputSelectUI} from '../../../template/ui/InputSelectUI';
import {
  EditFormKeys,
  isEditFormValid,
  isNewEditValue,
} from '../../../modules/user/form/UserEditForm';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {CitiesModal} from '../../../components/CitiesModal';
import {Modalize} from 'react-native-modalize';
import {editUser} from '../../../modules/user/thunks/edit.thunk';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const EditScreen = () => {
  const {userInfo, editForm} = useAppSelector(selectUserValues);
  const dispatch = useAppDispatch();

  const [isError, setIsError] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const citiesModalRef = useRef<Modalize>(null);

  const handleOpenModalCity = () => {
    citiesModalRef.current?.open();
  };

  useEffect(() => {
    dispatch(
      setDefaultEditForm({
        city: userInfo?.city!,
        full_name: userInfo?.full_name!,
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

    setIsLoad(true);
    dispatch(editUser()).finally(() => {
      setIsLoad(false);
    });
  };

  return (
    <KeyboardAwareScrollView style={{flex: 1}}>
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
              value={editForm.full_name}
              onChangeText={fullName =>
                handleChangeEditForm('full_name', fullName)
              }
            />

            {isError && !editForm.full_name.length ? (
              <MainContainer $mt={5}>
                <TextUI ag={Ag['500_12']} color={ColorsUI.red}>
                  {'Заполните поле'}
                </TextUI>
              </MainContainer>
            ) : null}
          </MainContainer>
        </MainContainer>

        <BorderTopUI $ph={20} $pt={20} $mb={Math.max(insets.bottom, 20)}>
          <ButtonUI
            onPress={handleSaveChange}
            $btnDisabled={!isNewEditValue(userInfo!, editForm) || isLoad}
            title="Сохранить"
          />
        </BorderTopUI>
      </ColumnContainerBetweenFlex>

      <CitiesModal modalizeRef={citiesModalRef} onPickCity={handleChangeCity} />
    </KeyboardAwareScrollView>
  );
};
