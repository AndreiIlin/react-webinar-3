import { memo } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import classnameWithCount from '../../utils/classname-with-count/index.js';

const MIN_LEVEL = 0;
const MAX_LEVEL = 8;

function ItemComment({
  username,
  created,
  text,
  answerFn,
  t,
  isOwnComment,
  wasDeleted,
  children,
  level,
}) {

  if (wasDeleted) {
    return (
      <div
        className={`ItemComment ${classnameWithCount('ItemComment', 'ml', 1, 10, level)}`}
      >
        <p className={'ItemComment-deleted'}>{t('comments.removed')}</p>
      </div>
    );
  }

  return (
    <div className={`ItemComment ${classnameWithCount('ItemComment', 'ml', 1, 10, level)}`}>
      <div className={'ItemComment-title'}>
        <p className={`ItemComment-user ${isOwnComment ? 'ItemComment-user-self' : ''}`}>{username}</p>
        <p className={'ItemComment-date'}>{created}</p>
      </div>
      <p className={'ItemComment-body'}>{text}</p>
      <div>
        <button className={'ItemComment-button'} onClick={answerFn}>{t('comments.answer')}</button>
      </div>
      {children}
    </div>
  );
}

ItemComment.propTypes = {
  username: PropTypes.string,
  created: PropTypes.string,
  text: PropTypes.string,
  t: PropTypes.func,
  answerFn: PropTypes.func,
  isOwnComment: PropTypes.bool,
  wasDeleted: PropTypes.bool,
  children: PropTypes.node,
  level: PropTypes.number,
};

ItemComment.defaultProps = {
  t: (text) => text,
  answerFn: () => {
  },
  isOwnComment: false,
  wasDeleted: false,
  level: 0,
};

export default memo(ItemComment);
