import * as types from '../../constants/actionTypes';

export default function lists(state = {}, action) {
  const payload = action.payload;

  switch (action.type) {
    case types.LISTS_ADD_CARD_ID: {
      // TODO: Remove variables duplicating.
      const { listId, cardId } = payload;
      const cards = state[listId].cards || [];

      return {
        ...state,
        [listId]: {
          ...state[listId],
          cards: [...cards, cardId],
        },
      };
    }
    case types.LISTS_REMOVE_CARD_ID: {
      const { listId, cardId } = payload;
      const cards = state[listId].cards || [];

      return {
        ...state,
        [listId]: {
          ...state[listId],
          cards: without(cards, cardId),
        },
      };
    }
    default:
      return state;
  }
}
