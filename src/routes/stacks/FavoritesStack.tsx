import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../models/Screens';
import {FavoritesScreen} from '../../screens/favorites/FavoritesScreen';

const Stack = createStackNavigator();

export const FavoritiesStack = () => {
  return (
    <Stack.Group screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Screens.FAVORITIES}
        component={FavoritesScreen}
        options={{
          gestureEnabled: true,
          ...TransitionPresets.ModalFadeTransition,
        }}
      />
    </Stack.Group>
  );
};
