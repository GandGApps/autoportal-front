export const MockCurrentOrganization = {
  _id: 'e9d5e4a5e',
  logo: '',
  name: 'Мастера Тормозов',
  address: 'ул. Кедровая 654',
  categoryName: 'Автосервис',
  rating: 4,
  countReviews: 1024,

  isFavorite: false,
  city: 'г.Казань',
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
  emplyeers: [
    {
      _id: 'skfj34ff',
      position: 'Старший мастер',
      name: 'Ичиго Курасаки',
      phone: '+79503339090',
    },
  ],
  services: [
    {
      _id: 'vjdd00dd',
      title: 'Замена двигателя',
    },
    {
      _id: 'vjdd00dd',
      title: 'Смена колес',
      subServices: [
        {
          _id: 'vjddgwd',
          title: 'Матовые',
        },
        {
          _id: 'vjddgwd',
          title: 'Глянцевые',
        },
        {
          _id: 'vjddgwd',
          title: 'Акриловые',
        },
      ],
    },
    {
      _id: 'vjdd00dd',
      title: 'Запчасти',
    },
  ],
  brandsCars: [
    {
      _id: 'fwlflll',
      title: 'BMW',
    },
    {
      _id: 'fwlflll',
      title: 'Mercedes',
    },
    {
      _id: 'fwlflll',
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
