import StoreModule from '../module.js';

class Locales extends StoreModule {
  initState() {
    return {
      currentLocale: 'ru',
      availableLocales: [
        {
          name: 'ru',
          default: true,
        },
        {
          name: 'en',
          default: false,
        },
      ],
    };
  }

  changeLocale(locale) {
    this.setState({
      ...this.getState(),
      currentLocale: locale,
    }, `Current locale changed on ${locale}`);
  }
}
export default Locales;
