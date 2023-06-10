import lastChildInfo from '../../utils/last-child-info/index.js';

export default {
  /**
   * Загрузка комментариев к товару
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      const res = await services.api.request({
        url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
      });

      // Товар загружен успешно
      dispatch({
        type: 'comments/load-success',
        payload: {
          data: res.data.result,
          parentId: id,
        },
      });

    };
  },

  /**
   * Отправка нового комментариев к товару или ответ на комментарий
   * @param comment {Object}
   * @return {Function}
   */
  send: (comment) => {
    return async (dispatch, getState, services) => {
      try {
        const res = await services.api.request({
          url: `api/v1/comments?lang=ru&fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted`,
          method: 'POST',
          body: JSON.stringify(comment),
        });

        dispatch({
          type: 'comments/send-success',
          payload: { data: res.data.result },
        });
      } catch {
        dispatch({ type: 'comments/send-error' });
      }
    };
  },

  /**
   * Изменяем данные для отправки комментариев (ID и имя пользователя)
   * @param info {Object}
   * @return {Function}
   */
  changeSendInfo: (info) => {
    return (dispatch, getState) => {
      if (info.type === 'head') {
        dispatch({
          type: 'comments/change-send-info',
          payload: {
            id: info.id,
            commentAreaLocation: {
              id: info.id,
              type: info.type,
            },
          },
        });
        return;
      }
      const { comments } = getState();
      console.log(comments);
      const currentComment = comments.list.find(comment => comment._id === info.id);
      if (!currentComment) return;

      const {
        result,
        lvl,
      } = lastChildInfo(currentComment);

      dispatch({
        type: 'comments/change-send-info',
        payload: {
          id: info.id,
          commentAreaLocation: {
            id: result,
            type: 'comment',
            lvl,
          },
        },
      });
    };
  },
};
