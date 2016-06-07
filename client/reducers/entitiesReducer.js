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

function boardsReducer(state = {}, action) {
  const payload = action.payload;

  switch (action.type) {
    case types.BOARDS_ADD_LIST_ID: {
      const { boardId, listId } = payload;
      const lists = state[boardId].lists || [];

      return {
        ...state,
        [boardId]: {
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

function listsReducer(state = {}, action) {
  const payload = action.payload;

  switch (action.type) {
    case types.LISTS_ADD_CARD_ID: {
      // TODO: Remove variables duplicating.
      const { listId, cardId } = payload;
      const cards = state[listId].cards || [];

      return {
        ...state,
        [listId]: {
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

export default function entities(state = {}, action) {
  const payload = action.payload;

  if (payload && payload.entities) {
    return merge({}, state, payload.entities);
  }

  return {
    boards: boardsReducer(state.boards, action),
    lists: listsReducer(state.lists, action),
    cards: cardsReducer(state.cards, action),
    users: state.users || {},
    comments: state.comments || {},
    activity: state.activity || {},
  };
}
