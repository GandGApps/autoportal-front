export const MockCurrentOrganization = {
  _id: 'e9d5e4a5e',
  logo: '',
  name: 'Мастера Тормозов',
  address: 'ул. Кедровая 654',
  category: {
    title: 'Автосервис',
  },
  rating: 4,
  countReviews: 1024,

  isFavorite: false,
  lastReview: {
    _id: 'fewfehfew',
    fullName: 'Луффи Мугивара',
    rating: 3.5,
    date: '20.08.2023',
    comment: 'В целом неплохо, но могло быть и лучше',
  },
  description:
    'Очень длинное описание, чтоб проверить, как обрезается текст, когда больше трех абзацев и можно было бы раскрыть',
  city: 'Казань',
  previews: [
    'https://i.pinimg.com/564x/b6/13/0c/b6130c3d66758a07d1908b4431eaecd7.jpg',
    'https://i.pinimg.com/564x/75/ca/8f/75ca8ff507bf4119c870ecd6ce45357c.jpg',
    'https://i.pinimg.com/564x/33/59/c5/3359c58a46d1b554928fa858452f68e1.jpg',
  ],
  promo: {
    description:
      'Скидка 10% на любую замену шин и еще пару слов, чтоб текст был более длинным',
    startPromo: '12.08.2023',
    endPromo: '25.09.2023',
  },
  contactInfo: {
    mainPhone: '+79508003030',
    whatsApp: '+79009509090',
  },
  employeers: [
    {
      _id: 'skfj34ff',
      position: 'Старший мастер',
      name: 'Ичиго Курасаки',
      phone: '+79503339090',
    },
    {
      _id: 'xcbrer',
      position: 'Механик',
      name: 'Эйс Портгас',
      phone: '+79103229090',
    },
    {
      _id: 'geger',
      position: 'Директор',
      name: 'Санджи Вансмок',
      phone: '+79400099090',
    },
  ],
  services: [
    {
      _id: 'vjdd00dd',
      title: 'Замена двигателя',
    },
    {
      _id: 'fwefvsds',
      title: 'Смена колес',
      subServices: [
        {
          _id: 'zxvbe',
          title: 'Матовые',
        },
        {
          _id: 'berbef',
          title: 'Глянцевые',
        },
        {
          _id: 'berefe',
          title: 'Акриловые',
        },
      ],
    },
    {
      _id: 'dfvdfvre',
      title: 'Запчасти',
    },
    {
      _id: 'xcvrwrv',
      title: 'Лобовое стекло',
    },
    {
      _id: 'вывав',
      title: 'Замена масла',
    },
  ],
  brandsCars: [
    {
      _id: 'fwlflll',
      title: 'BMW',
    },
    {
      _id: 'grergerg',
      title: 'Mercedes',
    },
    {
      _id: 'xcvcvre',
      title: 'Audi',
    },
  ],
  schedule: [
    {
      title: 'Понедельник',
      to: '10:00',
      do: '19:00',
    },
    {
      title: 'Вторник',
      to: '10:00',
      do: '19:00',
    },
    {
      title: 'Среда',
      to: '10:00',
      do: '19:00',
    },
    {
      title: 'Четверг',
      to: '10:00',
      do: '19:00',
    },
    {
      title: 'Пятница',
      isAllDay: true,
    },
  ],
};
