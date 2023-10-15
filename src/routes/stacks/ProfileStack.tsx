import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../models/Screens';
import {ProfileScreen} from '../../screens/profile/ProfileScreen';
import {InfoScreen} from '../../screens/profile/info/InfoScreen';
import {EditScreen} from '../../screens/profile/info/EditScreen';
import {RecoveryPasswordModal} from '../../screens/profile/question/RecoveryPasswordModal';
import {RemoveProfileModal} from '../../screens/profile/question/RemoveProfileModal';
import {LogoutModal} from '../../screens/profile/question/LogoutModal';
import {StackAnimated} from '../navigation/Animation';
import {Platform} from 'react-native';
import {ProfileAdmin} from '../../screens/profile/ProfileAdmin';

const Stack = createStackNavigator();

export const ProfileStack = () => {
  return (
    <Stack.Group screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Screens.PROFILE}
        component={ProfileScreen}
        options={{
          ...StackAnimated,
          presentation: Platform.OS === 'android' ? 'modal' : undefined,
        }}
      />

      <Stack.Screen name={Screens.PROFILE_INFO} component={InfoScreen} />

      <Stack.Screen name={Screens.PROFILE_EDIT} component={EditScreen} />

      <Stack.Screen
        name={Screens.RECOVERY_MODAL}
        component={RecoveryPasswordModal}
        options={{
          gestureEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />

      <Stack.Screen
        name={Screens.REMOVE_PROFILE_MODAL}
        component={RemoveProfileModal}
        options={{
          gestureEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />

      <Stack.Screen
        name={Screens.LOGOUT_MODAL}
        component={LogoutModal}
        options={{
          gestureEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
    </Stack.Group>
  );
};
