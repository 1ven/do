import { combineReducers } from 'redux';
import types from '../constants/actionTypes';

const INITIAL_STATE = {
  source: {
    listId: undefined,
    cardId: undefined,
  },
  target: {
    listId: undefined,
    cardId: undefined,
  },
};

function cards(state = INITIAL_STATE, action) {
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
    case types.CARD_END_DRAG:
      return INITIAL_STATE;
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
