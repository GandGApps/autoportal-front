import {Screens} from '../../../routes/models/Screens';

export type BottomTabsKey =
  | 'categories'
  | 'promotions'
  | 'addOrganization'
  | 'favorities'
  | 'profile';

export const BottomTabs = {
  categories: Screens.CATEGORIES,
  promotions: Screens.PROMOTIONS,
  addOrganization: Screens.ORGANIZATION_CREATE,
  favorities: Screens.FAVORITIES,
  profile: Screens.PROFILE,
};
