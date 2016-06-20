import * as types from '../../constants/actionTypes';

function list(state = {}, action) {
  const { payload } = action;

  switch (action.type) {
    case types.LISTS_ADD_CARD_ID:
      return {
        ...state,
        cards: [...state.cards, payload.cardId],
      };
    case types.LISTS_REMOVE_CARD_ID:
      return {
        ...state,
        cards: without(state.cards, payload.cardId),
      };
    default:
      return state;
  }
}

export default function lists(state = {}, action) {
  const { payload } = action;

  switch (action.type) {
    case types.LISTS_ADD_CARD_ID:
    case types.LISTS_REMOVE_CARD_ID:
      return {
        ...state,
        [payload.listId]: list(state[payload.listId], action),
      };
    default:
      return state;
  }
}
