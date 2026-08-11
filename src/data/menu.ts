import type { MenuDay } from '../types/kiosk';

export const menu: MenuDay[] = [
  {
    id: 'monday',
    shortLabel: 'Пн',
    label: 'Понедельник',
    date: '10 августа',
    sections: [
      {
        title: 'Завтрак',
        items: [
          {
            name: 'Каша овсяная',
          },
          {
            name: 'Бутерброд с сыром',
          },
          {
            name: 'Чай',
          },
        ],
      },
      {
        title: 'Обед',
        items: [
          {
            name: 'Суп овощной',
          },
          {
            name: 'Котлета',
          },
          {
            name: 'Картофельное пюре',
          },
          {
            name: 'Салат овощной',
          },
          {
            name: 'Компот',
          },
        ],
      },
    ],
  },
  {
    id: 'tuesday',
    shortLabel: 'Вт',
    label: 'Вторник',
    date: '11 августа',
    sections: [
      {
        title: 'Завтрак',
        items: [
          {
            name: 'Каша рисовая',
          },
          {
            name: 'Булочка',
          },
          {
            name: 'Какао',
          },
        ],
      },
      {
        title: 'Обед',
        items: [
          {
            name: 'Борщ',
          },
          {
            name: 'Куриная котлета',
          },
          {
            name: 'Гречка',
          },
          {
            name: 'Салат из капусты',
          },
          {
            name: 'Компот из сухофруктов',
          },
        ],
      },
      {
        title: 'Полдник',
        items: [
          {
            name: 'Творожная запеканка',
          },
          {
            name: 'Чай',
          },
        ],
      },
    ],
  },
  {
    id: 'wednesday',
    shortLabel: 'Ср',
    label: 'Среда',
    date: '12 августа',
    sections: [
      {
        title: 'Завтрак',
        items: [
          {
            name: 'Омлет',
          },
          {
            name: 'Хлеб с маслом',
          },
          {
            name: 'Чай',
          },
        ],
      },
      {
        title: 'Обед',
        items: [
          {
            name: 'Суп куриный с лапшой',
          },
          {
            name: 'Рыба запечённая',
          },
          {
            name: 'Рис',
          },
          {
            name: 'Овощной салат',
          },
          {
            name: 'Морс',
          },
        ],
      },
    ],
  },
  {
    id: 'thursday',
    shortLabel: 'Чт',
    label: 'Четверг',
    date: '13 августа',
    sections: [
      {
        title: 'Завтрак',
        items: [
          {
            name: 'Пшённая каша',
          },
          {
            name: 'Бутерброд с сыром',
          },
          {
            name: 'Какао',
          },
        ],
      },
      {
        title: 'Обед',
        items: [
          {
            name: 'Щи',
          },
          {
            name: 'Гуляш',
          },
          {
            name: 'Макароны',
          },
          {
            name: 'Салат морковный',
          },
          {
            name: 'Компот',
          },
        ],
      },
      {
        title: 'Полдник',
        items: [
          {
            name: 'Яблоко',
          },
          {
            name: 'Печенье',
          },
          {
            name: 'Чай',
          },
        ],
      },
    ],
  },
  {
    id: 'friday',
    shortLabel: 'Пт',
    label: 'Пятница',
    date: '14 августа',
    sections: [
      {
        title: 'Завтрак',
        items: [
          {
            name: 'Кукурузная каша',
          },
          {
            name: 'Булочка с джемом',
          },
          {
            name: 'Чай',
          },
        ],
      },
      {
        title: 'Обед',
        items: [
          {
            name: 'Суп с фрикадельками',
          },
          {
            name: 'Куриное филе',
          },
          {
            name: 'Картофельное пюре',
          },
          {
            name: 'Салат овощной',
          },
          {
            name: 'Компот',
          },
        ],
      },
    ],
  },
  {
    id: 'saturday',
    shortLabel: 'Сб',
    label: 'Суббота',
    date: '15 августа',
    sections: [
      {
        title: 'Завтрак',
        items: [
          {
            name: 'Сырники',
          },
          {
            name: 'Сметана',
          },
          {
            name: 'Чай',
          },
        ],
      },
      {
        title: 'Обед',
        items: [
          {
            name: 'Суп-пюре овощной',
          },
          {
            name: 'Котлета рыбная',
          },
          {
            name: 'Рис с овощами',
          },
          {
            name: 'Салат из свежих овощей',
          },
          {
            name: 'Морс',
          },
        ],
      },
      {
        title: 'Полдник',
        items: [
          {
            name: 'Банан',
          },
          {
            name: 'Йогурт',
          },
        ],
      },
    ],
  },
];