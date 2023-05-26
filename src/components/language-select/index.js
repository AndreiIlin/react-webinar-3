import { memo, useCallback } from 'react';
import './style.css';
import { useTranslation } from '../../hooks/use-translation.js';
import PropTypes from 'prop-types';

function LanguageSelect({
  changeLanguage,
  locales,
}) {
  const translate = useTranslation('languageSelect');
  const callbacks = {
    changeLanguage: useCallback((e) => changeLanguage(e.target.value), []),
  };
  return (
    <div className={'LanguageSelect'}>
      <label htmlFor="language-select" className={'LanguageSelect-label'}>{translate.select}:</label>
      <select
        name="language-select" id="language-select" className={'LanguageSelect-select'}
        onChange={callbacks.changeLanguage}
      >
        {locales.map(locale => (
          <option
            value={locale.name}
            defaultValue={locale.default}
            key={locale.name}
          >
            {translate.locales[locale.name]}
          </option>
        ))}
      </select>
    </div>
  );
}
LanguageSelect.propTypes = {
  changeLanguage: PropTypes.func,
  locales: PropTypes.array,
};
export default memo(LanguageSelect);
