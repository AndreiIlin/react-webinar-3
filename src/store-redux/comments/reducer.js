const initialState = {
  list: [],
  waiting: false,
  commentId: '',
  parentId: '',
  count: 0,
  sendStatus: 'idle',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return {
        ...state,
        list: [],
        waiting: true,
        commentId: '',
        parentId: '',
        count: 0,
        sendStatus: 'idle',
      };

    case 'comments/load-success':
      return {
        ...state,
        list: action.payload.data.items,
        waiting: false,
        count: action.payload.data.count,
        parentId: action.payload.parentId,
        commentId: action.payload.parentId,
      };

    case 'comments/change-send-info':
      return {
        ...state,
        commentId: action.payload.id,
        sendStatus: 'idle',
      };

    case 'comments/send-success':
      return {
        ...state,
        sendStatus: 'success',
        list: [...state.list, action.payload.data]
      }

    case 'comments/send-error':
      return {
        ...state,
        sendStatus: 'error',
      }

    default:
      return state;
  }
}

export default reducer;

