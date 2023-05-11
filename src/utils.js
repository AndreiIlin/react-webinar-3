const MAX_IDS = 999;
/**
 * Получение случайного уникального ID номера
 * @returns {Function}
 */
function uniqueIdFabric() {
  const ids = [];
  return () => {
    while (ids.length < MAX_IDS) {
      const randomId = Math.ceil(Math.random() * 1000);
      if (!ids.includes(randomId)) {
        ids.push(randomId);
        return randomId;
      }
    }
  };
}
/**
 * Инстанс фабрики генерации случайных уникальных номеров
 * @returns {Number}
 */
export const getUniqueId = uniqueIdFabric();
