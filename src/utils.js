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
  const childs = [];
  for (let i = 0; i < categories.length; i += 1) {
    const category = categories[i];

    if (category.parent !== null) {
      childs.push(category);
      continue;
    }

    formattedCategories.push({
      value: category._id,
      title: category.title,
      lvl: 0,
    });
  }
  while (childs.length) {
    const child = childs.shift();

    const parent = formattedCategories.find(category => category.value === child.parent._id);

    if (!parent) childs.push(child);

    const parentIndex = formattedCategories.indexOf(parent);

    const formattedChild = {
      value: child._id,
      title: `${('-').repeat(parent.lvl + 1)} ${child.title}`,
      lvl: parent.lvl + 1,
    };

    formattedCategories.splice(parentIndex + 1, 0, formattedChild);
  }

  return formattedCategories;
}

// Не понял, приходят ли с АПИ уже отсортированные категории или нет, резервный вариант с O(N)
// export function formatCategories(categories) {
//   const result = [];
//
//   for (let i = 0; i < categories.length; i += 1) {
//     const category = categories[i];
//     if (category.parent !== null) {
//       result.push({
//         value: category._id,
//         title: category.title,
//         lvl: 0,
//       });
//       continue;
//     }
//
//     const parent = result.find(formattedCategory => formattedCategory.value === category.parent._id);
//     const parentIndex = result.indexOf(parent);
//     const newItem = {
//       value: category._id,
//       title: `${('-').repeat(parent.lvl + 1)}${category.title}`,
//       lvl: parent.lvl + 1,
//     };
//     result.splice(parentIndex + 1, 0, newItem);
//   }
//
//   return result;
// }
