import React, {useCallback, useState} from 'react';
import {Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Insets} from '../../template/styles/Insets';
import {BackBtn} from '../../template/ui/BackBtn';
import {ColumnContainerBetweenFlex} from '../../template/containers/ColumnContainer';
import {ImageUI} from '../../template/ui/ImageUI';
import {MockAuthTabs} from './mock/MockAuthTabs';
import {TabMenu} from '../../components/tabMenu/TabMenu';
import {LoginContent} from './components/LoginContent';
import {RegisterContent} from './components/RegisterContent';
import {MainContainer} from '../../template/containers/MainContainer';
import {ButtonUI} from '../../template/ui/ButtonUI';
import {CenterContainer} from '../../template/containers/CenterContainer';
import {checkLoginValidation} from '../../modules/auth/form/LoginForm';
import {useAppDispatch, useAppSelector} from '../../settings/redux/hooks';
import {selectAuthValues, setAuthType} from '../../modules/auth/AuthSlice';
import {checkRegisterValidation} from '../../modules/auth/form/RegisterForm';
import {getCode} from '../../modules/auth/thunks/getCode.thunks';
import {AuthType} from '../../modules/auth/types/types';
import {registerAuth} from '../../modules/auth/thunks/register.thunks';

export const AuthScreen = () => {
  const dispatch = useAppDispatch();
  const {loginForm, registerForm} = useAppSelector(selectAuthValues);
  const [activeTab, setActiveTab] = useState(MockAuthTabs.login);

  const [isDiabled, setIsDisabled] = useState(false);

  const handleChangeTab = (type: string) => {
    dispatch(setAuthType(type as AuthType));

    setActiveTab(type);
  };

  const handleAuthPress = () => {
    if (activeTab === MockAuthTabs.login) {
      if (checkLoginValidation(loginForm)) {
        setIsDisabled(true);
        dispatch(getCode()).finally(() => {
          setIsDisabled(false);
        });
      }
      return;
    }

    if (checkRegisterValidation(registerForm)) {
      setIsDisabled(true);
      dispatch(registerAuth()).finally(() => {
        setIsDisabled(false);
      });
    }
  };

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case MockAuthTabs.login: {
        return <LoginContent />;
      }
      case MockAuthTabs.register: {
        return <RegisterContent />;
      }
    }
  }, [activeTab]);

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={Platform.OS === 'android'}
      extraHeight={200}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flex: 1,
        paddingTop: Math.max(Insets.top, 20),
        paddingBottom: Math.max(Insets.bottom, 20),
      }}
      enableResetScrollToCoords={false}
      stickyHeaderHiddenOnScroll={false}>
      <ColumnContainerBetweenFlex $ph={20}>
        <MainContainer>
          <BackBtn />
          <CenterContainer $mb={30}>
            <ImageUI
              style={{width: 150, height: 150}}
              resizeMode={'contain'}
              source={require('./../../../assets/img/logo.png')}
            />
          </CenterContainer>
          <TabMenu
            $mb={30}
            activeTab={activeTab}
            tabs={MockAuthTabs}
            onChangeTab={handleChangeTab}
          />

          {renderContent()}
        </MainContainer>

        <ButtonUI
          $btnDisabled={isDiabled}
          title={activeTab === MockAuthTabs.login ? 'Войти' : 'Регистрация'}
          onPress={handleAuthPress}
        />
      </ColumnContainerBetweenFlex>
    </KeyboardAwareScrollView>
  );
};
