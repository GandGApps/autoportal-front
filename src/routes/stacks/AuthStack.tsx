import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../models/Screens';
import {AuthScreen} from '../../screens/auth/AuthScreen';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Group screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screens.AUTH} component={AuthScreen} />
    </Stack.Group>
  );
};
