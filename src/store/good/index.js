import StoreModule from '../module.js';

class Good extends StoreModule {
  initState() {
    return {
      goodInfo: null,
    };
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      goodInfo: json.result,
    }, 'Загружена информация о товаре из АПИ');
  }

  /**
   * Очищение данных из стора, что бы при при переходе на очередной товар на микросекунды не видеть данные о предыдущем товаре
   */
  clear() {
    this.setState({
      ...this.getState(),
      goodInfo: null,
    }, 'Очищены данны о товаре из стора');
  }
}
export default Good;
