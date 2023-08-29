import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../models/Screens';
import {CategoriesScreen} from '../../screens/categories/CategoriesScreen';
import {CatSearchScreen} from '../../screens/categories/_searchServices/CatSearchScreen';
import {CatOrganizationsScreens} from '../../screens/categories/_organizations/CatOrganizationsScreens';
import {CatFilterScreens} from '../../screens/categories/_filter/CatFilterScreens';
import {StackAnimated} from '../navigation/Animation';
import {Platform} from 'react-native';

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
