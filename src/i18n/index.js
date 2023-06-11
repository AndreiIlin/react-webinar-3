import * as translations from './translations/index.js';

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   * @param translations {Object} Объект с переводами текстов
   * @param servicesUsage {boolean} Проверяем есть ли взаимодействие с другими сервисами
   * @param servicesMethods {Object} Методы сервисов, которые взаимодействуют с данным сервисом
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.translations = this.config.translations || {};
    this.locale = this.config.locale || 'ru';
    this.servicesMethods = this.config.servicesMethods;
    this.listeners = [];

    if (this.config.servicesMethods) {
      this.setLocaleForServicesMethods();
    }
  }

  /**
   * Установка текущей локали для использующих ее методов сервисов
   */
  setLocaleForServicesMethods() {
    for (const service of Object.keys(this.servicesMethods)) {
      for (const method of this.servicesMethods[service]) {
        this.services[service][method](this.locale);
      }
    }
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

    if (this.config.servicesMethods) {
      this.setLocaleForServicesMethods();
    }

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
