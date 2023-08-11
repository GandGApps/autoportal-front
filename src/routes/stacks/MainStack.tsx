import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../models/Screens';
import {CategoriesScreen} from '../../screens/categories/CategoriesScreen';

const Stack = createStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Group>
      <Stack.Screen
        name={Screens.CATEGORIES}
        component={CategoriesScreen}
        options={{headerShown: false}}
      />
    </Stack.Group>
  );
};
