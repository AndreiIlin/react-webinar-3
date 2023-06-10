import lastChildInfo from './index.js';

describe('lastChildInfo', () => {
  test('Если нет детей, вернет ключ текущего уровня вложенности', () => {
    const item = {
      _id: '1',
      children: [],
    };

    expect(lastChildInfo(item)).toEqual('1');
  });

  test('Если есть дети, рекуррентно вернет ключ детей', () => {
    const item = {
      _id: '1',
      children: [{
        _id: '2',
        children: [],
      }],
    };

    expect(lastChildInfo(item)).toEqual('2');
  });

  test('Если детей несколько, вернет ключ последнего ребенка', () => {
    const item = {
      _id: '1',
      children: [{
        _id: '2',
        children: [],
      },
        {
          _id: '3',
          children: [],
        }],
    };

    expect(lastChildInfo(item)).toEqual('3');
  });
});
