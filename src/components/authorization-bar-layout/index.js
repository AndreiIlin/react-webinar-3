import PropTypes from 'prop-types';
import { memo } from 'react';
import './style.css';

function AuthorizationBarLayout({ children }) {
  return (
    <div className={'AuthorizationBarLayout'}>
      {children}
    </div>
  );
}

AuthorizationBarLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(AuthorizationBarLayout);
