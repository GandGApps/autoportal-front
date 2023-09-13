import React, {useCallback, useState} from 'react';
import {Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Insets} from '../../template/styles/Insets';
import {BackBtn} from '../../template/ui/BackBtn';
import {
  ColumnContainerBetweenFlex,
  ColumnContainerFlex,
} from '../../template/containers/ColumnContainer';
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
import {selectAuthValues} from '../../modules/auth/AuthSlice';
import {loginAuth} from '../../modules/auth/thunks/login.thunks';

export const AuthScreen = () => {
  const dispatch = useAppDispatch();
  const {loginForm, registerForm} = useAppSelector(selectAuthValues);
  const [activeTab, setActiveTab] = useState(MockAuthTabs.login);

  const [isDiabled, setIsDisabled] = useState(false);

  const handleAuthPress = () => {
    if (activeTab === MockAuthTabs.login) {
      if (checkLoginValidation(loginForm)) {
        setIsDisabled(true);
        dispatch(loginAuth()).finally(() => {
          setIsDisabled(false);
        });
      }
      return;
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
            onChangeTab={setActiveTab}
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
