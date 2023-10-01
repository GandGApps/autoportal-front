export const Endpoints = {
  // AUTH
  guestAuth: '/users/login/guest',
  sendCode: '/users/login/dealer/confirm',
  getCode: '/users/login/dealer/make-call',

  editUser: '/users/login/dealer/data',

  // ORGANIZATION
  banners: '/banners',

  categories: '/categories',

  organizations: '/organisations',
  myOrganizations: '/organisations/my',

  currentOrganization: (id: string) => `/organisations?id=${id}`,

  promotions: '/promotion',

  favorites: '/organisations/favorites',

  createdStatus: '/organisations/my/created',

  // FILTER

  searchSubServices: (query: string) => `/services?query="${query}"`,
  cities: (query: string) => `/cities?city="${query}"`,
  filter: (catId: string) => `/filter?categoryId=${catId}`,

  // USER INFO
  userInfo: '/users/profile/dealer',

  // UPLOAD FILE
  file: '/organisations/photo',
};
