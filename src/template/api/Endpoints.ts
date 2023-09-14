export const Endpoints = {
  // AUTH
  guestAuth: '/users/login/guest',
  sendCode: '/users/login/dealer/confirm',
  getCode: '/users/login/dealer/make-call',

  register: '/users/login/dealer/data',

  // ORGANIZATION
  categories: '/categories',

  organizations: '/organisations',

  currentOrganization: (id: string) => `/organisations?id=${id}`,

  searchSubServices: (query: string) => `/services?query="${query}"`,

  cities: (query: string) => `/cities?city="${query}"`,

  filter: (catId: string) => `/filter?categoryId=${catId}`,

  // USER INFO
  userInfo: '/users/profile/dealer',
};
