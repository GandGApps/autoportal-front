import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../models/Screens';
import {ReviewsListScreen} from '../../screens/reviews/ReviewsListScreen';
import {ReviewCreateScreen} from '../../screens/reviews/_create/ReviewCreateScreen';
const Stack = createStackNavigator();

export const ReviewsStack = () => {
  return (
    <Stack.Group screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screens.REVIEWS} component={ReviewsListScreen} />

      <Stack.Screen
        name={Screens.REVIEWS_CREATE}
        component={ReviewCreateScreen}
      />
    </Stack.Group>
  );
};
