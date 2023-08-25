import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../models/Screens';
import {PromotionsScreen} from '../../screens/promotions/PromotionsScreen';

const Stack = createStackNavigator();

export const PromotionsStack = () => {
  return (
    <Stack.Group screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Screens.PROMOTIONS}
        component={PromotionsScreen}
        options={{
          gestureEnabled: true,
          ...TransitionPresets.ModalFadeTransition,
        }}
      />
    </Stack.Group>
  );
};
