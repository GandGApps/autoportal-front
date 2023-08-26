import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../models/Screens';
import {ProfileScreen} from '../../screens/profile/ProfileScreen';
import {InfoScreen} from '../../screens/profile/info/InfoScreen';
import {EditScreen} from '../../screens/profile/info/EditScreen';

const Stack = createStackNavigator();

export const ProfileStack = () => {
  return (
    <Stack.Group screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Screens.PROFILE}
        component={ProfileScreen}
        options={{
          gestureEnabled: true,
          ...TransitionPresets.ModalFadeTransition,
        }}
      />

      <Stack.Screen name={Screens.PROFILE_INFO} component={InfoScreen} />

      <Stack.Screen name={Screens.PROFILE_EDIT} component={EditScreen} />
    </Stack.Group>
  );
};
