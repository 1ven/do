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

function boardReducer(state = {
  lists: [],
  listsLength: 0,
  cardsLength: 0,
}, action) {
  const { payload } = action;
  switch (action.type) {
    case types.LISTS_CREATE_SUCCESS:
      return {
        ...state,
        lists: [...state.lists, payload.result.list],
        listsLength: state.listsLength + 1,
      };
    case types.LISTS_REMOVE_SUCCESS:
      return {
        ...state,
        lists: state.lists.filter(id => id !== payload.result.list),
        listsLength: state.listsLength - 1,
      };
    case types.CARDS_CREATE_SUCCESS:
      return {
        ...state,
        cardsLength: state.cardsLength + 1,
      };
    case types.CARDS_REMOVE_SUCCESS:
      return {
        ...state,
        cardsLength: state.cardsLength - 1,
      };
    default:
      return state;
  }
}

function boardsReducer(state = {}, action) {
  const { payload } = action;

  try {
    const list = payload.entities.lists[payload.result.list];
    var board = state[list.boardId];
  } catch (e) {}

  try {
    const card = payload.entities.cards[payload.result.card];
    var board = state[card.boardId];
  } catch (e) {}

  switch (action.type) {
    case types.LISTS_CREATE_SUCCESS:
    case types.LISTS_REMOVE_SUCCESS:
    case types.CARDS_CREATE_SUCCESS:
    case types.CARDS_REMOVE_SUCCESS:
      return {
        ...state,
        [board.id]: boardReducer(board, action),
      };
    case types.BOARDS_CREATE_SUCCESS:
      return {
        ...state,
        [payload.result.board]: boardReducer(undefined, action),
      };
    default:
      return state;
  }
}

function listsReducer(state = {}, action) {
  const { payload } = action;

  try {
    var cardId = payload.result.card;
    var card = payload.entities.cards[cardId];
    var list = state[card.listId];
  } catch (e) {}

  switch (action.type) {
    case types.CARDS_CREATE_SUCCESS:
      return {
        ...state,
        [list.id]: {
          ...list,
          cards: [...list.cards || [], cardId],
        },
      };
    case types.CARDS_REMOVE_SUCCESS:
      return {
        ...state,
        [list.id]: {
          ...list,
          cards: list.cards.filter(id => id !== cardId),
        },
      };
    default:
      return state;
  }
}

function combine(state = {}, action) {
  return {
    boards: boardsReducer(state.boards, action),
    lists: listsReducer(state.lists, action),
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
    /* const mergedState = merge({}, state, payload.entities); */
    /* return combine(mergedState, action); */
    return merge({}, combine(state, action), payload.entities);
  }

  return combine(state, action);
}
