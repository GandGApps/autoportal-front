import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../models/Screens';
import {PromotionsScreen} from '../../screens/promotions/PromotionsScreen';
import {Platform} from 'react-native';
import {StackAnimated} from '../navigation/Animation';

const Stack = createStackNavigator();

export const PromotionsStack = () => {
  return (
    <Stack.Group screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Screens.PROMOTIONS}
        component={PromotionsScreen}
        options={{
          ...StackAnimated,
          presentation: Platform.OS === 'android' ? 'modal' : undefined,
        }}
      />
    </Stack.Group>
  );
};
