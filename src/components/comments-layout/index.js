import PropTypes, { string } from 'prop-types';
import { memo } from 'react';
import './style.css';

function CommentsLayout({ children, title }) {
  return (
    <div className={'CommentsLayout'}>
      <p className={'CommentsLayout-title'}>{title}</p>
      {children}
    </div>
  );
}

CommentsLayout.propTypes = {
  children: PropTypes.node,
  title: string,
};

CommentsLayout.defaultProps = {
  title: '',
}
export default memo(CommentsLayout);
