import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CommentsList({ children }) {
  return (
    <div className={'CommentsList'}>
      {children}
    </div>
  );
}

CommentsList.propTypes = {
  children: PropTypes.node,
};

export default memo(CommentsList);
