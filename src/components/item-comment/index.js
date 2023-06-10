import { memo } from 'react';
import './style.css';
import PropTypes from 'prop-types';

function ItemComment({
  username,
  created,
  text,
  answerFn,
  t,
  isOwnComment,
  wasDeleted,
}) {

  if (wasDeleted) {
    return (
      <div
        className={`ItemComment`}
      >
        <p className={'ItemComment-deleted'}>{t('comments.removed')}</p>
      </div>
    );
  }

  return (
    <div className={`ItemComment`}>
      <div className={'ItemComment-title'}>
        <p className={`ItemComment-user ${isOwnComment ? 'ItemComment-user-self' : ''}`}>{username}</p>
        <p className={'ItemComment-date'}>{created}</p>
      </div>
      <p className={'ItemComment-body'}>{text}</p>
      <div>
        <button className={'ItemComment-button'} onClick={answerFn}>{t('comments.answer')}</button>
      </div>
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
};

ItemComment.defaultProps = {
  t: (text) => text,
  answerFn: () => {
  },
  isOwnComment: false,
  wasDeleted: false,
};

export default memo(ItemComment);
