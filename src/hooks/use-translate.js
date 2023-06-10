import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import useServices from './use-services.js';
import shallowequal from 'shallowequal';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const services = useServices();

  // Текущая локаль
  const [locale, setLocale] = useState(() => services.i18n.locale);

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return services.i18n.subscribe(() => {
      const newLocale = services.i18n.locale;
      setLocale(prevState => shallowequal(prevState, newLocale) ? prevState : newLocale);
    });
  }, []);

  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  // Функция для смены локали
  const setLang = useCallback(lang => services.i18n.setLocale(lang), []);
  // Функция для локализации текстов
  const t = useCallback((text, number) => services.i18n.translate(text, number, locale), [locale]);

  return {
    lang: locale,
    setLang,
    t,
  };
}
