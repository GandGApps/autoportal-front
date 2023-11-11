export const Endpoints = {
  // AUTH
  guestAuth: '/users/login/guest',
  sendCode: '/users/login/dealer/confirm',
  getCode: '/users/login/dealer/make-call',

  editUser: '/users/login/dealer/data',

  adminLogin: '/admin/login',

  // ORGANIZATION
  banners: (city: string) => `/banners?city=${city}`,

  categories: '/categories',

  organizations: '/organisations',
  myOrganizations: '/organisations/my',
  updateOrganization: (id: string) => `/organisations?organisation_id=${id}`,

  currentOrganization: (id: string) => `/organisations?id=${id}`,

  promotions: (city: string, categoriId: string) =>
    `/promotion?city=${city}&categoryId=${categoriId}`,

  createPromotion: (id: string) => `/promotion?organizationId=${id}`,

  updatePromotion: (id: string) => `/promotion?organizationId=${id}`,

  deletePromotion: (id: string) => `/promotion?organisation_id=${id}`,

  favorites: '/organisations/favorites',
  changeFavorite: (id: string) => `/organisations/favorites?organisation=${id}`,

  createdStatus: '/organisations/my/created',

  // FILTER

  searchSubServices: (query: string) => `/services?query=${query}`,
  cities: (query: string) => `/cities/find?city=${query}`,
  filter: (catId: string) => `/filter?categoryId=${catId}`,

  // USER INFO
  userInfo: '/users/profile/dealer',

  // UPLOAD FILE
  file: '/organisations/photo',

  // REVIEWS
  reviews: (id: string) => `/reviews?organizationId=${id}`,

  //SUBSCRIBE
  checkRelease: '/subscribe/release',
  subInfo: '/subscribe/info',

  // ADMIN
  finance: '/admin/sub',
  getUsers: (city: string) => `/admin/users?city=${city}`,
  getUserOrganizations: (dealerId: string) =>
    `/admin/organisations/users?dealerId=${dealerId}`,
  subscribe: (type: string, id: string) =>
    `/subscribe/${type}?organizationId=${id}`,
  approveSubscribe: (id: string, type: string) =>
    `/subscribe/approve?organizationId=${id}&type=${type}`,
  services: (categoryId: string) => `/services?category_id=${categoryId}`,
  service: '/services',
  changeService: (serviceId: string) => `/services?serviceId=${serviceId}`,
  extServices: '/services/ext',
  getExtServices: (serviceId: string) => `/services/ext?serviceId=${serviceId}`,
  changeBanner: (bannerId: string) => `/banners?bannerId=${bannerId}`,
};
