import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../models/Screens';
import {FavoritesScreen} from '../../screens/favorites/FavoritesScreen';
import {StackAnimated} from '../navigation/Animation';
import {Platform} from 'react-native';

const Stack = createStackNavigator();

export const FavoritiesStack = () => {
  return (
    <Stack.Group screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Screens.FAVORITIES}
        component={FavoritesScreen}
        options={{
          ...StackAnimated,
          presentation: Platform.OS === 'android' ? 'modal' : undefined,
        }}
      />
    </Stack.Group>
  );
};
