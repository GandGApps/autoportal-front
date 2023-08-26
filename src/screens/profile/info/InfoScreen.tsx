import React, {useEffect, useState} from 'react';
import {
  ColumnContainerBetweenFlex,
  ColumnContainerFlex,
} from '../../../template/containers/ColumnContainer';
import {MainContainer} from '../../../template/containers/MainContainer';
import {GradientHeader} from '../../../components/GradientHeader';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {selectUserValues} from '../../../modules/user/UserSlice';
import {getUserInfo} from '../../../modules/user/_thunks';
import {CenterContainerFlex} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';
import {InputSelectUI} from '../../../template/ui/InputSelectUI';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {MaskHelper} from '../../../helper/MaskHelper';
import {BorderTopUI} from '../../../template/ui/BorderTopUI';
import {UnderLineText} from '../../../components/UnderLineText';
import {ColorsUI} from '../../../template/styles/ColorUI';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';

export const InfoScreen = () => {
  const {userInfo, isUserInfoLoad} = useAppSelector(selectUserValues);
  const dispatch = useAppDispatch();

  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getUserInfo()).finally(() => {
        setIsLoad(false);
      });
    }, 0);
  }, []);

  const handleGoToEdit = () => {
    Navigation.navigate(Screens.PROFILE_EDIT);
  };

  return (
    <ColumnContainerFlex>
      <MainContainer>
        <GradientHeader isBack title="Мои данные" />
      </MainContainer>

      {isLoad || isUserInfoLoad ? (
        <CenterContainerFlex>
          <Loader size={20} />
        </CenterContainerFlex>
      ) : (
        <ColumnContainerBetweenFlex>
          <MainContainer $ph={20} $pv={30}>
            <TextUI $mb={20} ag={Ag['400_16']}>
              {userInfo?._id}
            </TextUI>
            <TextUI $mb={20} ag={Ag['400_16']}>
              {`г. ${userInfo?.city}`}
            </TextUI>
            <TextUI $mb={20} ag={Ag['400_16']}>
              {userInfo?.fullName}
            </TextUI>
            <TextUI $mb={20} ag={Ag['400_16']}>
              {MaskHelper.formatPhoneNumber(userInfo?.phone)}
            </TextUI>
            <TextUI ag={Ag['400_16']}>{userInfo?.email}</TextUI>
          </MainContainer>

          <BorderTopUI $isFlex>
            <MainContainer $pt={20} $ph={20}>
              <InputSelectUI
                onPress={handleGoToEdit}
                leftIcon={<MainContainer />}
                value={'Редактировать'}
                rightIcon={<MainContainer />}
              />
            </MainContainer>
          </BorderTopUI>
          <BorderTopUI $isFlex>
            <MainContainer $pt={20} $ph={20}>
              <UnderLineText
                $mb={15}
                text={'Выход из аккаунта'}
                colorLine={ColorsUI.red}
                colorText={ColorsUI.red}
              />
              <UnderLineText $mb={15} text={'Договор публичной оферты'} />
              <UnderLineText $mb={15} text={'Политика конфиденциальности'} />
              <UnderLineText
                $mb={15}
                text={'Договор на обработку персональных данных'}
              />
              <UnderLineText text={'Удалить аккаунт'} />
            </MainContainer>
          </BorderTopUI>
        </ColumnContainerBetweenFlex>
      )}
    </ColumnContainerFlex>
  );
};
