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

const Stack = createStackNavigator();

export const RouterApp = () => {
  useEffect(() => {
    (async () => {
      await RNBootSplash.hide({fade: true, duration: 500});
    })();
  }, []);

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

        {MainStack()}
        {PromotionsStack()}
        {FavoritiesStack()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
