/**
 * Добавление к классу приставки с количеством
 * @param classname {string} Начальный класс
 * @param prefix {string} Приставка
 * @param minCount {number} Минимальное число
 * @param maxCount {number} Максимальное число
 * @param count {number} Текущее число
 * @returns {string} Новый класс
 */
export default function classnameWithCount(classname, prefix, minCount, maxCount, count) {
  if (count < minCount) return '';
  if (count > maxCount) return `${classname}-${prefix}-${maxCount}`;
  return `${classname}-${prefix}-${count}`;
}
