import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../models/Screens';
import {CategoriesScreen} from '../../screens/categories/CategoriesScreen';
import {CategoriesSearchScreen} from '../../screens/categories/CategoriesSearchScreen';

const Stack = createStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Group screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screens.CATEGORIES} component={CategoriesScreen} />
      <Stack.Screen
        name={Screens.CATEGORIES_SEARCH}
        component={CategoriesSearchScreen}
      />
    </Stack.Group>
  );
};
