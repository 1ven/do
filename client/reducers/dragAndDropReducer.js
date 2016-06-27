import { combineReducers } from 'redux';
import types from '../constants/actionTypes';

function cards(state = {
  source: {
    listId: undefined,
    cardId: undefined,
  },
  target: {
    listId: undefined,
    cardId: undefined,
  },
}, action) {
  const { payload } = action;
  switch (action.type) {
    case types.CARD_BEGIN_DRAG:
      return {
        ...state,
        source: {
          listId: payload.listId,
          cardId: payload.cardId,
        },
      };
    case types.CARD_MOVE_SYNC:
      return {
        ...state,
        target: payload.target,
      };
    default:
      return state;
  }
}

export default combineReducers({
  cards,
});
