/**
 * Возврат свойства из последнего листа дерева
 * @param item {Object} Ветка дерева
 * @param [key] {String} Необходимое свойство
 * @param lvl {number} Уровень относительно родителя
 * @returns {any} Свойство последнего листа дерева
 */
export default function lastChildInfo(item, key = '_id', lvl = 0) {
  if (!item.children.length) return {
    result: item[key],
    lvl,
  };

  const lastChild = item.children.at(-1);
  if (!lastChild.children.length) return {
    result: lastChild[key],
    lvl: lvl + 1,
  };

  return lastChildInfo(lastChild, key, lvl + 1);
}
