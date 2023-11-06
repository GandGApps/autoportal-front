import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../models/Screens';
import {StackAnimated} from '../navigation/Animation';
import {Platform} from 'react-native';
import {ProfileAdmin} from '../../screens/profile/ProfileAdmin';
import {UsersScreen} from '../../screens/admin/users/UsersScreen';
import {AdminServices} from '../../screens/admin/services/AdminServices';
import {FinanceSettings} from '../../screens/admin/finance/FinanceSettings';
import {AdminBanners} from '../../screens/admin/banners/AdminBanners';
import {CreateBanner} from '../../screens/admin/banners/CreateBanner';
import {UsersOrganizations} from '../../screens/admin/users/UsersOrganizations';
import {AdminEditService} from '../../screens/admin/services/AdminEditService';
import {BannerRemove} from '../../screens/admin/banners/question/BannerRemove';

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
      <Stack.Screen name={Screens.ADMIN_SERVICES} component={AdminServices} />
      <Stack.Screen
        name={Screens.ADMIN_EDIT_SERVICE}
        component={AdminEditService}
      />
      <Stack.Screen name={Screens.ADMIN_FINANCE} component={FinanceSettings} />
      <Stack.Screen name={Screens.ADMIN_BANNERS} component={AdminBanners} />
      <Stack.Screen
        name={Screens.ADMIN_CREATE_BANNER}
        component={CreateBanner}
      />
      <Stack.Screen
        name={Screens.MODAL_BANNER_REMOVE}
        component={BannerRemove}
      />
      <Stack.Screen
        name={Screens.ADMIN_USER_ORGANIZATIONS}
        component={UsersOrganizations}
      />
    </Stack.Group>
  );
};
