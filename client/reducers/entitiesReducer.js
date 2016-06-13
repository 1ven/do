import merge from 'lodash/merge';
import without from 'lodash/without';
import * as types from '../constants/actionTypes';

function cardsReducer(state = {}, action) {
  const payload = action.payload;

  switch (action.type) {
    case types.CARDS_ADD_COMMENT_ID: {
      const { cardId, commentId } = payload;
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

export default function entities(state = {}, action) {
  const payload = action.payload;

  if (payload && payload.entities) {
    return merge({}, state, payload.entities);
  }

  return {
    boards: state.boards || {},
    lists: state.lists || {},
    cards: cardsReducer(state.cards, action),
    users: state.users || {},
    comments: state.comments || {},
    activity: state.activity || {},
    trash: state.trash || {},
  };
}
