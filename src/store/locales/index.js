import StoreModule from '../module.js';

class Locales extends StoreModule {
  initState() {
    return {
      currentLocale: 'ru',
    };
  }

  changeLocale() {
    if (this.getState().currentLocale === 'ru') {
      this.setState({
        ...this.getState(),
        currentLocale: 'en',
      });
      return;
    }
    this.setState({
      ...this.getState(),
      currentLocale: 'ru',
    });
  }
}
export default Locales;
