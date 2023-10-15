import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {InitScreen} from '../screens/_init/InitScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {MainStack} from './stacks/MainStack';
import {Screens} from './models/Screens';
import Navigation from './navigation/Navigation';
import {ColorsUI} from '../template/styles/ColorUI';
import RNBootSplash from 'react-native-bootsplash';
import {PromotionsStack} from './stacks/PromotionsStack';
import {FavoritiesStack} from './stacks/FavoritesStack';
import {ProfileStack} from './stacks/ProfileStack';
import {OrganizationStack} from './stacks/OrganizationStack';
import Toast from 'react-native-toast-notifications';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ReviewsStack} from './stacks/ReviewsStack';
import {ReportStack} from './stacks/ReportStack';
import {WelcomeScreen} from '../screens/welcome/WelcomeScreen';
import {AuthStack} from './stacks/AuthStack';
import {AdminStack} from './stacks/AdminStack';

const Stack = createStackNavigator();

export const RouterApp = () => {
  useEffect(() => {
    (async () => {
      await RNBootSplash.hide({fade: true, duration: 500});
    })();
  }, []);

  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer
      ref={Navigation.navigationRef}
      theme={{
        ...DefaultTheme,
        colors: {...DefaultTheme.colors, background: ColorsUI.white},
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={ColorsUI.white} />

      <Stack.Navigator
        initialRouteName={Screens.INIT}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={Screens.INIT}
          component={InitScreen}
          options={{
            headerShown: false,
            presentation: 'transparentModal',
          }}
        />

        <Stack.Screen name={Screens.WELCOME} component={WelcomeScreen} />

        {AuthStack()}
        {AdminStack()}
        {MainStack()}
        {OrganizationStack()}
        {PromotionsStack()}
        {FavoritiesStack()}
        {ProfileStack()}
        {ReviewsStack()}
        {ReportStack()}
      </Stack.Navigator>

      <Toast
        style={{marginTop: insets.top}}
        ref={ref => (global['toast'] = ref as any)}
      />
    </NavigationContainer>
  );
};
