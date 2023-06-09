import {useCallback, useContext} from "react";
import useSelector from "./use-selector";
import translate from "../i18n/translate";
import {I18nContext} from "../i18n/context";
import useStore from './use-store.js';


/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const store = useStore();
  // Текущая локаль
  const lang = useSelector(state => state.locale.lang);
  // Функция для смены локали
  const setLang = useCallback(lang => store.actions.locale.setLang(lang), []);
  // Функция для локализации текстов
  const t = useCallback((text, number) => translate(lang, text, number), [lang]);

  return {lang, setLang, t};

  return useContext(I18nContext);
}
