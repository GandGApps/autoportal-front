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
  addOrganization: Screens.ADD_ORGANIZATION,
  favorities: Screens.FAVORITIES,
  profile: Screens.PROFILE,
};
