import * as types from '../../constants/actionTypes';

export default function cards(state = {}, action) {
  const payload = action.payload;

  switch (action.type) {
    case types.CARDS_ADD_COMMENT_ID: {
      const { cardId, commentId } = payload;
      // possible replace with _.union
      const comments = state[cardId].comments || [];

      return {
        ...state,
        [cardId]: {
          comments: [...comments, commentId],
        },
      };
    }
    default:
      return state;
  }
}
