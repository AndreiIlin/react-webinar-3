import { translation } from '../locales/index.js';
import useSelector from '../store/use-selector.js';

export function useTranslation(key) {
  const selector = useSelector(state => ({
    language: state.locales.currentLocale,
  }));
  const currentLanguage = selector.language;
  return translation[currentLanguage][key];
}
