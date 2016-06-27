import without from 'lodash/without';
import update from 'react/lib/update';
import types from '../../constants/actionTypes';

function list(state = {}, action) {
  const { payload } = action;

  switch (action.type) {
    case types.LIST_ADD_CARD_ID:
      return {
        ...state,
        cards: [...state.cards, payload.cardId],
      };
    case types.LIST_REMOVE_CARD_ID:
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
    case types.LIST_ADD_CARD_ID:
    case types.LIST_REMOVE_CARD_ID:
      return {
        ...state,
        [payload.listId]: list(state[payload.listId], action),
      };
    case types.CARD_MOVE_SYNC: {
      const { source, target } = payload;

      const stateAfterSource = update(state, {
        [source.listId]: {
          cards: {
            $splice: [
              [state[source.listId].cards.indexOf(source.cardId), 1],
            ],
          },
        },
      });

      const stateAfterTarget = update(stateAfterSource, {
        [target.listId]: {
          cards: {
            $splice: [
              [state[target.listId].cards.indexOf(target.cardId), 0, source.cardId],
            ],
          },
        },
      });

      return stateAfterTarget;
    }
    default:
      return state;
  }
}
