import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../models/Screens';
import {CategoriesScreen} from '../../screens/categories/CategoriesScreen';
import {CatSearchScreen} from '../../screens/categories/_searchServices/CatSearchScreen';
import {CatFilterScreens} from '../../screens/categories/_filter/CatFilterScreens';
import {StackAnimated} from '../navigation/Animation';
import {Platform} from 'react-native';
import {CatOrganizationsScreens} from '../../screens/organization/_cat_list/CatOrganizationsScreens';

const Stack = createStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Group screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Screens.CATEGORIES}
        component={CategoriesScreen}
        options={{
          ...StackAnimated,
          presentation: Platform.OS === 'android' ? 'modal' : undefined,
        }}
      />
      <Stack.Screen name={Screens.CAT_SEARCH} component={CatSearchScreen} />
      <Stack.Screen
        name={Screens.CAT_ORGANIZATIONS}
        component={CatOrganizationsScreens}
      />
      <Stack.Screen name={Screens.CAT_FILTER} component={CatFilterScreens} />
    </Stack.Group>
  );
};
