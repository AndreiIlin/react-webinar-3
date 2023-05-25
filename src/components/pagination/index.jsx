import PropTypes from 'prop-types';
import PaginationCell from './pagination-cell/index.jsx';
import React, { useCallback } from 'react';
import './style.css';

function Pagination({
  pagesCount,
  changeActivePage,
  activePage,
}) {
  // const cells = useMemo(() => Array.from({ length: pagesCount }, (_, index) => index + 1), [pagesCount]);
  const cells = Array.from({ length: pagesCount }, (_, index) => index + 1);
  const handleChangeActivePage = useCallback((cell) => () => changeActivePage(cell), []);
  return (
    <div className={'Pagination-container'}>
      {cells.map((cell, index) => {
        if (index === 0 || index === cells.length - 1) {
          return <PaginationCell value={cell} key={cell} isActive={cell === activePage} onClick={handleChangeActivePage(cell)} />;
        }
        if (cell === activePage || cell === activePage - 1 || cell === activePage + 1) {
          return <PaginationCell value={cell} key={cell} isActive={cell === activePage} onClick={handleChangeActivePage(cell)} />;
        }
        if ((cell === activePage - 2 && activePage === cells.length)
          || (cell === activePage + 2 && activePage === 1)) {
          return <PaginationCell value={cell} key={cell} isActive={cell === activePage} onClick={handleChangeActivePage(cell)} />;
        }
        if (cell === activePage - 2 || cell === activePage + 2
          || (cell === activePage - 3 && activePage === cells.length)
          || (cell === activePage + 3 && activePage === 1)
        ) {
          return <PaginationCell value={null} key={cell} isActive={cell === activePage} onClick={handleChangeActivePage(cell)} />;
        }
      })}
    </div>
  );
}
Pagination.propTypes = {
  pagesCount: PropTypes.number,
  changeActivePage: PropTypes.func,
  activePage: PropTypes.number,
};
Pagination.defaultProps = {
  changeActivePage: () => {
  },
  pagesCount: 0,
  activePage: 1,
};
export default React.memo(Pagination);
