import PropTypes from 'prop-types';
import './style.css';
import React from 'react';

function PaginationCell({
  value,
  onClick,
  isActive,
}) {
  return (
    value ?
    <div className={`Pagination-cell ${isActive ? 'Pagination-cell-active' : ''}`} onClick={onClick}>{value}</div> :
      <div className={'Pagination-cell Pagination-cell-ellipsis'}>...</div>
  );
}
PaginationCell.propTypes = {
  value: PropTypes.number,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};
PaginationCell.defaultProps = {
  onClick: () => {
  },
};
export default React.memo(PaginationCell);
