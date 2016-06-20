import * as types from '../../constants/actionTypes';
import without from 'lodash/without';

export default function boards(state = {}, action) {
  const payload = action.payload;

  switch (action.type) {
    case types.BOARDS_ADD_LIST_ID: {
      const { boardId, listId } = payload;
      const lists = state[boardId].lists || [];

      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          lists: [...lists, listId]
        },
      };
    }
    case types.BOARDS_REMOVE_LIST_ID: {
      const { boardId, listId } = payload;
      const lists = state[boardId].lists || [];

      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          lists: without(lists, listId)
        },
      };
    }
    case types.BOARDS_INC_LISTS_LENGTH: {
      const { boardId } = payload;
      const board = state[boardId];

      return {
        ...state,
        [boardId]: {
          ...board,
          listsLength: board.listsLength + 1,
        },
      };
    }
    case types.BOARDS_DEC_LISTS_LENGTH: {
      const { boardId } = payload;
      const board = state[boardId];

      return {
        ...state,
        [boardId]: {
          ...board,
          listsLength: board.listsLength - 1,
        },
      };
    }
    case types.BOARDS_INC_CARDS_LENGTH: {
      const { boardId } = payload;
      const board = state[boardId];

      return {
        ...state,
        [boardId]: {
          ...board,
          cardsLength: board.cardsLength + 1,
        },
      };
    }
    case types.BOARDS_DEC_CARDS_LENGTH: {
      const { boardId } = payload;
      const board = state[boardId];

      return {
        ...state,
        [boardId]: {
          ...board,
          cardsLength: board.cardsLength -1,
        },
      };
    }
    default:
      return state;
  }
}
