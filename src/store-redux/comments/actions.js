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
    return (dispatch) => {
      dispatch({
        type: 'comments/change-send-info',
        payload: info,
      });
    };
  },
};
