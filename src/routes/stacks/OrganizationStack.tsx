import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../models/Screens';
import {OrganizationScreen} from '../../screens/organization/_single/OrganizationScreen';
import {MyOrganizationsScreen} from '../../screens/organization/_my/MyOrganizations';
import {CreateOrganizationScreen} from '../../screens/organization/_create/CreateOrganization';
import {EditOrganizationScreen} from '../../screens/organization/_edit/EditOrganization';
import {PromotionScreen} from '../../screens/organization/_promo/PromotionScreen';
import {PromoRemoveModal} from '../../screens/organization/_promo/quastion/PromoRemoveModal';
import {StackAnimated} from '../navigation/Animation';
import {Platform} from 'react-native';

const Stack = createStackNavigator();

export const OrganizationStack = () => {
  return (
    <Stack.Group screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Screens.ORGANIZATION}
        component={OrganizationScreen}
      />
      <Stack.Screen
        name={Screens.ORGANIZATION_MY}
        component={MyOrganizationsScreen}
      />
      <Stack.Screen
        name={Screens.ORGANIZATION_CREATE}
        component={CreateOrganizationScreen}
        options={{
          ...StackAnimated,
          presentation: Platform.OS === 'android' ? 'modal' : undefined,
        }}
      />
      <Stack.Screen
        name={Screens.ORGANIZATION_EDIT}
        component={EditOrganizationScreen}
      />
      <Stack.Screen
        name={Screens.ORGANIZATION_PROMO}
        component={PromotionScreen}
      />

      <Stack.Screen
        name={Screens.ORGANIZATION_PROMO_REMOVE}
        component={PromoRemoveModal}
        options={{
          ...StackAnimated,
          presentation: Platform.OS === 'android' ? 'modal' : undefined,
        }}
      />
    </Stack.Group>
  );
};
