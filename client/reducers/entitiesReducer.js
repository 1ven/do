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
  const { payload } = action;

  try {
    var listId = payload.result.list;
    var list = payload.entities.lists[listId];
    var board = state[list.boardId];
  } catch (e) {}

  switch (action.type) {
    case types.LISTS_CREATE_SUCCESS:
      return {
        ...state,
        [board.id]: {
          ...board,
          lists: [...board.lists, listId],
          listsLength: board.listsLength + 1,
        },
      };
    case types.LISTS_REMOVE_SUCCESS:
      return {
        ...state,
        [board.id]: {
          ...board,
          lists: board.lists.filter(id => id !== listId),
          listsLength: board.listsLength - 1,
        },
      };
    default:
      return state;
  }
}

function combine(state = {}, action) {
  return {
    boards: boardsReducer(state.boards, action),
    lists: state.lists || {},
    cards: cardsReducer(state.cards, action),
    users: state.users || {},
    comments: state.comments || {},
    activity: state.activity || {},
    trash: state.trash || {},
  };
}

export default function entities(state = {}, action) {
  const payload = action.payload;

  if (payload && payload.entities) {
    const mergedState = merge({}, state, payload.entities);
    return combine(mergedState, action);
  }

  return combine(state, action);
}
