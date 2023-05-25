import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      pagesCount: 0,
      activePage: 1,
    };
  }

  async load(page) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${page - 1}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      pagesCount: Math.ceil(json.result.count / 10),
    }, 'Загружены товары из АПИ');
  }

  changeActivePage(page) {
    this.setState({
      ...this.getState(),
      activePage: page,
    }, `Активная страница изменена на ${page}`)
  }
}
export default Catalog;
