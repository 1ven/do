import without from 'lodash/without';
import merge from 'lodash/merge';
import update from 'react/lib/update';
import types from '../../constants/actionTypes';
import { entity } from './index';

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
    default:
      return entity('lists')(state, action);
  }
}
