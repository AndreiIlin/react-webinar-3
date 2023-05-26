import { memo } from 'react';
import './styles.css';
import PropTypes from 'prop-types';

function LanguageSelectLayout({ children }) {
  return (
    <div className={'LanguageSelectLayout'}>
      {children}
    </div>
  );
}
LanguageSelectLayout.propTypes = {
  children: PropTypes.node,
};
export default memo(LanguageSelectLayout);
