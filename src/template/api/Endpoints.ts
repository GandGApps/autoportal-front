export const Endpoints = {
  guestAuth: '/users/login/guest',
  sendCode: '/users/login/dealer/confirm',
  getCode: '/users/login/dealer/make-call',

  cities: (query: string) => `/cities?city="${query}"`,
  register: (phone: string) => `/users/login/dealer/data?phone_number=${phone}`,
};
