import classnameWithCount from './index.js';

describe('classnameWithCount', () => {
  test('Число меньше минимума, должен вернуть пустую строку', () => {
    expect(classnameWithCount('Test', 'count', 1, 5, 0)).toEqual('')
  })

  test('Число больше максимума, должен вернуть новый класс с максимальным числом', () => {
    expect(classnameWithCount('Test', 'count', 1, 5, 6)).toEqual('Test-count-5')
  })

  test('Должен вернуть новый класс с текущим числом', () => {
    expect(classnameWithCount('Test', 'count', 1, 5, 4)).toEqual('Test-count-4')
  })
})
