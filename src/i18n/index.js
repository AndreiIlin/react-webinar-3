import * as translations from './translations/index.js';

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   * @param translations {Object} Объект с переводами текстов
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.translations = config.translations || {};
    this.locale = config.locale || 'ru';
    this.listeners = [];
    this.initRequestHeaders();
  }


  initRequestHeaders() {
    this.services.api.setHeader('Accept-Language', this.locale);
  }

  /**
   * Установка новых переводов
   * @param translations {Object} Объект с переводами текстов
   */
  setTranslations(translations) {
    this.translations = translations;
  }

  /**
   * Установка текущего языка
   * @param locale {string} Язык перевода
   */
  setLocale(locale) {
    this.locale = locale;
    this.services.api.setHeader('Accept-Language', locale);

    for (const listener of this.listeners) listener();
  }

  /**
   * Перевод фразу по словарю
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @param lang {String} Код языка
   * @returns {String} Переведенный текст
   */
  translate(text, plural, lang = this.locale) {
    let result = this.translations[lang] && (text in this.translations[lang])
      ? translations[lang][text]
      : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }
}

export default I18nService;
