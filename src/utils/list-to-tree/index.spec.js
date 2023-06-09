import listToTree from "./index";

describe('listToTree', () => {
  test('test1', () => {
    const list = [
      {_id: 2, title: 'Электроника', parent: null},
      {_id: 3, title: 'Телефоны', parent: {_id: 2}},
      {_id: 8, title: 'Книги', parent: null},
      {_id: 9, title: 'Учебники', parent: {_id: 8}},
      {_id: 6, title: 'Ноутбуки', parent: {_id: 2}},
      {_id: 7, title: 'Телевизоры', parent: {_id: 2}},
      {_id: 10, title: 'Художественная', parent: {_id: 8}},
      {_id: 11, title: 'Комиксы', parent: {_id: 8}},
      {_id: 4, title: 'Смартфоны', parent: {_id: 3}},
      {_id: 5, title: 'Аксессуары', parent: {_id: 3}},
    ]

    expect(listToTree(list)).toEqual([
      {
        _id: 2, title: "Электроника", parent: null, children: [
          {
            _id: 3, title: "Телефоны", parent: {_id: 2}, children: [
              {_id: 4, title: "Смартфоны", parent: {_id: 3}, children: []},
              {_id: 5, title: "Аксессуары", parent: {_id: 3}, children: []}
            ]
          },
          {_id: 6, title: "Ноутбуки", parent: {_id: 2}, children: []},
          {_id: 7, title: "Телевизоры", parent: {_id: 2}, children: []}
        ]
      },
      {
        _id: 8, title: "Книги", parent: null, children: [
          {_id: 9, title: "Учебники", parent: {_id: 8}, children: []},
          {_id: 10, title: "Художественная", parent: {_id: 8}, children: []},
          {_id: 11, title: "Комиксы", parent: {_id: 8}, children: []}
        ]
      }
    ]);
  });

  test('test2', () => {
    const list = [
      {_id: 2, title: 'Электроника', parent: null},
      {_id: 3, title: 'Телефоны', parent: {_id: 2}},
      {_id: 8, title: 'Книги', parent: null},
      {_id: 9, title: 'Учебники', parent: {_id: 8}},
      {_id: 6, title: 'Ноутбуки', parent: {_id: 2}},
      {_id: 7, title: 'Телевизоры', parent: {_id: 2}},
      {_id: 10, title: 'Художественная', parent: {_id: 8}},
      {_id: 11, title: 'Комиксы', parent: {_id: 8}},
      {_id: 4, title: 'Смартфоны', parent: {_id: 3}},
      {_id: 5, title: 'Аксессуары', parent: {_id: 4}},
      {_id: 12, title: 'Сюрприз =)', parent: {_id: 11}},
    ]

    expect(listToTree(list)).toEqual([
      {
        _id: 2, title: "Электроника", parent: null, children: [
          {
            _id: 3, title: "Телефоны", parent: {_id: 2}, children: [
              {
                _id: 4, title: "Смартфоны", parent: {_id: 3}, children: [
                  {_id: 5, title: "Аксессуары", parent: {_id: 4}, children: []}
                ]
              },
            ]
          },
          {_id: 6, title: "Ноутбуки", parent: {_id: 2}, children: []},
          {_id: 7, title: "Телевизоры", parent: {_id: 2}, children: []}
        ]
      },
      {
        _id: 8, title: "Книги", parent: null, children: [
          {_id: 9, title: "Учебники", parent: {_id: 8}, children: []},
          {_id: 10, title: "Художественная", parent: {_id: 8}, children: []},
          {
            _id: 11, title: "Комиксы", parent: {_id: 8}, children: [
              {_id: 12, title: "Сюрприз =)", parent: {_id: 11}, children: []},
            ]
          }
        ]
      }
    ]);
  });

  test('test3', () => {
    const list = [
      {_id: 1, text: 'Первый комментарий', parent: { _id: 10, _type: 'article'}},
      {_id: 2, text: 'Второй комментарий', parent: { _id: 10, _type: 'article'}},
      {_id: 3, text: 'Третий комментарий', parent: { _id: 10, _type: 'article'}},
      {_id: 4, text: 'Четвертый комментарий', parent: { _id: 1, _type: 'comment'}},
      {_id: 5, text: 'Пятый комментарий', parent: { _id: 3, _type: 'comment'}},
      {_id: 6, text: 'Шестой комментарий', parent: { _id: 2, _type: 'comment'}},
      {_id: 7, text: 'Седьмой комментарий', parent: { _id: 4, _type: 'comment'}},
      {_id: 8, text: 'Восьмой комментарий', parent: { _id: 7, _type: 'comment'}},
      {_id: 9, text: 'Восьмой комментарий', parent: { _id: 5, _type: 'comment'}},
    ]

    expect(listToTree(list, (item) =>  item.parent?._type === 'comment')).toEqual([
      {_id: 1, text: 'Первый комментарий', parent: { _id: 10, _type: 'article'}, children: [
          {_id: 4, text: 'Четвертый комментарий', parent: { _id: 1, _type: 'comment'}, children: [
              {_id: 7, text: 'Седьмой комментарий', parent: { _id: 4, _type: 'comment'}, children: [
                  {_id: 8, text: 'Восьмой комментарий', parent: { _id: 7, _type: 'comment'}, children: []},
                ]},
            ]},
        ]},
      {_id: 2, text: 'Второй комментарий', parent: { _id: 10, _type: 'article'}, children: [
          {_id: 6, text: 'Шестой комментарий', parent: { _id: 2, _type: 'comment'}, children: []},
        ]},
      {_id: 3, text: 'Третий комментарий', parent: { _id: 10, _type: 'article'}, children: [
          {_id: 5, text: 'Пятый комментарий', parent: { _id: 3, _type: 'comment'}, children: [
              {_id: 9, text: 'Восьмой комментарий', parent: { _id: 5, _type: 'comment'}, children: []},
            ]},
        ]},
    ])

  })
});
