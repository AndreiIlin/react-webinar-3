import { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

function CommentArea({
  isAuth,
  isRootComment,
  loginLink,
  back,
  t,
  sendFn,
  cancelFn,
  username,
  sendStatus,
  rowsCount,
  action,
  actionFn,
}) {
  const [areaText, setAreaText] = useState('');

  useEffect(() => {
    if (sendStatus === 'success') {
      setAreaText('');
      cancelFn();
    }
  }, [sendStatus]);

  const handleChange = (event) => {
    setAreaText(event.target.value);
  };

  const handleSend = () => {
    if (!areaText.trim()) return;
    sendFn(areaText.trim());
  };

  const textareaRef = useRef(null);

  useEffect(() => {
    if (!isRootComment && isAuth) {
      textareaRef.current.select();
    }
  }, [isAuth]);

  return (
    <div className={`CommentArea ${isRootComment ? '' : 'CommentArea-answer'}`}>
      {!isAuth ? (
        <p className={'CommentArea-no-auth'}>
          <Link className={'CommentArea-link'} to={loginLink} state={back}>{t('comments.signIn')}</Link>
          {isRootComment ? t('comments.toComment') : (
            t('comments.toAnswer'))}
          {!isRootComment &&
            <Link onClick={actionFn} to={'#'} className={'CommentArea-link-cancel'}>{t(`comments.${action}`)}</Link>}
        </p>
      ) : (
        <>
          <p className={'CommentArea-title'}>{isRootComment ? t('comments.newComment') : t('comments.newAnswer')}</p>
          <textarea
            ref={textareaRef}
            placeholder={isRootComment ? t('comments.rootPlaceholder') : `${t('comments.childPlaceholder')} ${username}`}
            className={'CommentArea-textarea'}
            name="commentArea"
            id="commentArea"
            rows={rowsCount}
            value={areaText}
            onChange={handleChange}
          />
          {sendStatus === 'error' && <p className={'CommentArea-error'}>{t('comments.sendError')}</p>}
          <div className={'CommentArea-button-group'}>
            <button onClick={handleSend} className={'CommentArea-button'}>{t('comments.send')}</button>
            {!isRootComment &&
              <button onClick={cancelFn} className={'CommentArea-button'}>{t('comments.cancel')}</button>}
          </div>
        </>
      )}
    </div>
  );
}

CommentArea.propTypes = {
  isAuth: PropTypes.bool,
  isRootComment: PropTypes.bool,
  loginLink: PropTypes.string,
  back: PropTypes.object,
  t: PropTypes.func,
  sendFn: PropTypes.func,
  cancelFn: PropTypes.func,
  username: PropTypes.string,
  sendStatus: PropTypes.string,
  rowsCount: PropTypes.number,
  action: PropTypes.string,
  actionFn: PropTypes.func,
};

CommentArea.defaultProps = {
  t: (text) => text,
  isRootComment: true,
  sendFn: () => {
  },
  cancelFn: () => {
  },
  rowsCount: 5,
  action: 'cancel',
  actionFn: () => {
  },
};

export default memo(CommentArea);
