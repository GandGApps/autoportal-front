export const Endpoints = {
  guestAuth: '/users/login/guest',
  login: '/users/login/dealer',

  cities: (query: string) => `/cities?city="${query}"`,
};
