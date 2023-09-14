export const Endpoints = {
  // AUTH
  guestAuth: '/users/login/guest',
  sendCode: '/users/login/dealer/confirm',
  getCode: '/users/login/dealer/make-call',

  register: '/users/login/dealer/data',

  // ORGANIZATION
  categories: '/categories',

  organizations: '/organisations',

  searchSubServices: (query: string) => `/services?query="${query}"`,

  cities: (query: string) => `/cities?city="${query}"`,

  // USER INFO
  userInfo: '/users/profile/dealer',
};
