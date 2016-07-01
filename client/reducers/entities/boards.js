import types from '../../constants/actionTypes';
import without from 'lodash/without';

function board(state = {}, action) {
  const payload = action.payload;

  switch (action.type) {
    case types.BOARD_ADD_LIST_ID:
      return {
        ...state,
        lists: [...state.lists, payload.listId],
      };
    case types.BOARD_REMOVE_LIST_ID:
      return {
        ...state,
        lists: without(state.lists, payload.listId),
      };
    case types.BOARD_INC_LISTS_LENGTH:
      return {
        ...state,
        listsLength: state.listsLength + 1,
      };
    case types.BOARD_DEC_LISTS_LENGTH:
      return {
        ...state,
        listsLength: state.listsLength - 1,
      };
    case types.BOARD_INC_CARDS_LENGTH:
      return {
        ...state,
        cardsLength: state.cardsLength + 1,
      };
    case types.BOARD_DEC_CARDS_LENGTH:
      return {
        ...state,
        cardsLength: state.cardsLength - payload.count,
      };
    default:
      return state;
  }
}

export default function boards(state = {}, action) {
  const payload = action.payload;

  switch (action.type) {
    case types.BOARD_ADD_LIST_ID:
    case types.BOARD_REMOVE_LIST_ID:
    case types.BOARD_INC_LISTS_LENGTH:
    case types.BOARD_DEC_LISTS_LENGTH:
    case types.BOARD_INC_CARDS_LENGTH:
    case types.BOARD_DEC_CARDS_LENGTH:
      return {
        ...state,
        [payload.boardId]: board(state[payload.boardId], action),
      };
    default:
      return state;
  }
}
