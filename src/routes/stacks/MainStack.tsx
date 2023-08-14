import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../models/Screens';
import {CategoriesScreen} from '../../screens/categories/CategoriesScreen';
import {CategoriesSearchScreen} from '../../screens/categories/CategoriesSearchScreen';
import {CatOrganizationsScreens} from '../../screens/categories/_organizations/CatOrganizationsScreens';
import {CatFilterScreens} from '../../screens/categories/_filter/CatFilterScreens';

const Stack = createStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Group screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screens.CATEGORIES} component={CategoriesScreen} />
      <Stack.Screen
        name={Screens.CATEGORIES_SEARCH}
        component={CategoriesSearchScreen}
        listeners={{
          beforeRemove: e => {},
        }}
      />
      <Stack.Screen
        name={Screens.CAT_ORGANIZATIONS}
        component={CatOrganizationsScreens}
      />
      <Stack.Screen name={Screens.CAT_FILTER} component={CatFilterScreens} />
    </Stack.Group>
  );
};
