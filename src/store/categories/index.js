import StoreModule from '../module.js';

class CategoriesState extends StoreModule {
  initState() {
    return {
      storeCategories: [],
      selectedCategory: '',
    };
  }

  /**
   * Подгружаем список категорий товаров
   * @returns {Promise<void>}
   */
  async loadCategories(formatter) {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      storeCategories: json.result.items,
    }, 'Загружаем список категорий товаров из АПИ');
  }

  /**
   * Меняем выбранную категорию
   * @param category {String}
   * @returns {Promise<void>}
   */
  changeCategory(category) {
    const currentCategory = this.getState().storeCategories.find(cat => cat._id === category);
    this.setState({
      ...this.getState(),
      selectedCategory: category,
    }, `Выбрана категория: ${currentCategory?.title ?? 'Все'}`);
  }
}

export default CategoriesState;
