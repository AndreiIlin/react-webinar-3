import React, { memo, useCallback, useMemo } from 'react';
import CommentsLayout from '../../components/comments-layout/index.js';
import useTranslate from '../../hooks/use-translate.js';
import shallowequal from 'shallowequal';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import Spinner from '../../components/spinner/index.js';
import CommentsList from '../../components/comments-list/index.js';
import useSelectorStore from '../../hooks/use-selector.js';
import CommentArea from '../../components/comment-area/index.js';
import { useLocation } from 'react-router-dom';
import treeToList from '../../utils/tree-to-list/index.js';
import listToTree from '../../utils/list-to-tree/index.js';
import ItemComment from '../../components/item-comment/index.js';
import dateFormat from '../../utils/date-format.js';
import commentsActions from '../../store-redux/comments/actions.js';
import ItemCommentLayout from '../../components/item-comment-layout/index.js';

function Comments() {
  const { t } = useTranslate();

  const location = useLocation();

  const dispatch = useDispatch();

  const reduxSelect = useSelectorRedux(state => ({
    count: state.comments.count,
    list: state.comments.list,
    commentId: state.comments.commentId,
    parentId: state.comments.parentId,
    waiting: state.comments.waiting,
    sendStatus: state.comments.sendStatus,
    commentAreaLocation: state.comments.commentAreaLocation,
  }), shallowequal);

  const storeSelect = useSelectorStore(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
    username: state.session.user.profile?.name,
    locale: state.locale.lang,
  }));

  const options = {
    comments: useMemo(() => treeToList(listToTree(reduxSelect.list, (item) => item.parent?._type === 'comment'), (item, level) => ({
        ...item,
        level,
      }),
    ), [reduxSelect.list]),
    isRootComment: useMemo(() => reduxSelect.commentId === reduxSelect.parentId, [reduxSelect.parentId, reduxSelect.commentId]),
  };

  const callbacks = {
    sendComment: useCallback(async (text) => {
      if (options.isRootComment) {
        dispatch(commentsActions.send({
          text,
          parent: {
            _id: reduxSelect.parentId,
            _type: 'article',
          },
        }));
        return;
      }
      dispatch(commentsActions.send({
        text,
        parent: {
          _id: reduxSelect.commentId,
          _type: 'comment',
        },
      }));
    }, [options.isRootComment, reduxSelect.parentId, reduxSelect.commentId]),
    backToHead: useCallback(() => {
      dispatch(commentsActions.changeSendInfo({
        id: reduxSelect.parentId,
        type: 'head',
      }));
    }, [reduxSelect.parentId]),
    answer: useCallback(({ id }) => () => {
      dispatch(commentsActions.changeSendInfo({
        id,
        type: 'answer',
      }));
    }, []),
  };

  const render = {
    comments: useCallback(item => {
      const isOwnComment = item.author.profile.name === storeSelect.username;
      const parsedDate = new Date(item.dateCreate);
      const created = dateFormat(parsedDate, storeSelect.locale, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      return (
        <React.Fragment key={item._id}>
          <ItemCommentLayout level={item.level}>
            <ItemComment
              username={item.author.profile.name} t={t} isOwnComment={isOwnComment}
              created={created} locale={storeSelect.locale}
              text={item.text} wasDeleted={item.isDeleted} answerFn={callbacks.answer({
              id: item._id,
            })}
            />
          </ItemCommentLayout>
          {reduxSelect.commentAreaLocation.id === item._id && (
            <ItemCommentLayout
              level={item.level - (reduxSelect.commentAreaLocation.lvl - 1)}
            >
              <CommentArea
                t={t}
                isAuth={storeSelect.exists}
                back={{ back: location.pathname }}
                loginLink={'/login'}
                isRootComment={false}
                cancelFn={callbacks.backToHead}
                username={item.author.profile.name}
                sendStatus={reduxSelect.sendStatus}
                sendFn={callbacks.sendComment}
                actionFn={callbacks.backToHead}
              />
            </ItemCommentLayout>
          )}
        </React.Fragment>
      );
    }, [storeSelect.username, t, reduxSelect.commentId, reduxSelect.sendStatus]),
  };

  return (
    <CommentsLayout title={`${t('comments.title')} (${reduxSelect.count})`}>
      <Spinner active={reduxSelect.waiting}>
        {!!reduxSelect.list.length && (
          <CommentsList>
            {options.comments.map(render.comments)}
          </CommentsList>
        )}
        {options.isRootComment && <CommentArea
          t={t}
          isAuth={storeSelect.exists}
          back={{ back: location.pathname }}
          loginLink={'/login'}
          sendStatus={reduxSelect.sendStatus}
          sendFn={callbacks.sendComment}
        />}
      </Spinner>
    </CommentsLayout>
  );
}

export default memo(Comments);
