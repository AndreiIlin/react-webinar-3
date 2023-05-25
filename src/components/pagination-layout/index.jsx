import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

function PaginationLayout({ children }) {
  return (
    <div className={'PaginationLayout'}>
      {children}
    </div>
  );
}
PaginationLayout.propTypes = {
  children: PropTypes.node,
};
export default React.memo(PaginationLayout);
