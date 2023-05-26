import { memo, useCallback } from 'react';
import './style.css';
import useStore from '../../store/use-store.js';
import { useTranslation } from '../../hooks/use-translation.js';

function LanguageToggle() {
  const store = useStore();
  const translate = useTranslation('languageToggle')
  const callbacks = {
    changeLanguage: useCallback(() => store.actions.locales.changeLocale(), [store]),
  };
  return (
    <div className={'LanguageToggle'}>
      <button onClick={callbacks.changeLanguage} className={'LanguageToggle-btn'}>{translate.translate}</button>
    </div>
  );
}
export default memo(LanguageToggle);
