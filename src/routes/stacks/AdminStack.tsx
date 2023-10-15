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
import {UsersScreen} from '../../screens/admin/users/UsersScreen';
import {AdminCategories} from '../../screens/admin/categories/AdminCategories';
import {FinanceSettings} from '../../screens/admin/finance/FinanceSettings';
import {AdminBanners} from '../../screens/admin/banners/AdminBanners';

const Stack = createStackNavigator();

export const AdminStack = () => {
  return (
    <Stack.Group screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Screens.PROFILE_ADMIN}
        component={ProfileAdmin}
        options={{
          ...StackAnimated,
          presentation: Platform.OS === 'android' ? 'modal' : undefined,
        }}
      />

      <Stack.Screen name={Screens.ADMIN_USERS} component={UsersScreen} />
      <Stack.Screen
        name={Screens.ADMIN_CATEGORIES}
        component={AdminCategories}
      />
      <Stack.Screen name={Screens.ADMIN_FINANCE} component={FinanceSettings} />
      <Stack.Screen name={Screens.ADMIN_BANNERS} component={AdminBanners} />
    </Stack.Group>
  );
};
