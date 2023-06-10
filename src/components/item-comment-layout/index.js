import PropTypes from 'prop-types';
import { memo } from 'react';
import classnameWithCount from '../../utils/classname-with-count/index.js';
import './style.css';

function ItemCommentLayout({
  children,
  level,
}) {

  return (
    <div className={classnameWithCount('ItemCommentLayout', 'ml', 1, 10, level)}>
      {children}
    </div>
  );
}

ItemCommentLayout.propTypes = {
  children: PropTypes.node,
  level: PropTypes.number,
};

export default memo(ItemCommentLayout);
