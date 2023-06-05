/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}
/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}
/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}
/**
 * Форматирование категорий товаров
 * @param categories {Array}
 * @returns {Array}
 */
export function formatCategories(categories) {
  const formattedCategories = [];
  let childrens = [];
  let parentId;
  let parentIndex;
  for (let i = 0; i < categories.length; i += 1) {
    const category = categories[i];

    if (category.parent === null) {
      formattedCategories.push({
        value: category._id,
        title: category.title,
        lvl: 0,
      });

      continue;
    }

    if (category.parent._id !== parentId) {
      formattedCategories.splice(parentIndex + 1, 0, ...childrens);
      childrens = [];
      parentId = category.parent._id;
      parentIndex = formattedCategories.findIndex(cat => cat.value === parentId);
    }

    const parent = formattedCategories.find(cat => cat.value === category.parent._id);
    const formattedChild = {
      value: category._id,
      title: `${('- ').repeat(parent.lvl + 1)}${category.title}`,
      lvl: parent.lvl + 1,
    };

    childrens.push(formattedChild);
  }

  if (childrens.length > 0) {
    formattedCategories.splice(parentIndex + 1, 0, ...childrens);
  }

  return formattedCategories;
}
