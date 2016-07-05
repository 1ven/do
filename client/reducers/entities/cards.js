import types from '../../constants/actionTypes';

function card(state = {}, action) {
  const { payload } = action;

  switch (action.type) {
    case types.CARD_ADD_COMMENT_ID:
      return {
        ...state,
        comments: [...state.comments, payload.commentId],
      };
    case types.CARD_REMOVE_COMMENT_ID:
      return {
        ...state,
        comments: state.comments.filter(id => id !== payload.commentId),
      };
    default:
      return state;
  }
}

export default function cards(state = {}, action) {
  const { payload } = action;

  switch (action.type) {
    case types.CARD_ADD_COMMENT_ID:
    case types.CARD_REMOVE_COMMENT_ID:
      return {
        ...state,
        [payload.cardId]: card(state[payload.cardId], action),
      };
    default:
      return state;
  }
}
