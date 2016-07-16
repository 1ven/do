import merge from 'lodash/merge';
import without from 'lodash/without';
import types from '../../constants/actionTypes';
import { entity } from './index';

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
    case types.BOARD_CREATE_SUCCESS:
      return {
        ...payload.entities.boards[payload.result.board],
        cardsLength: 0,
        listsLength: 0,
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
    case types.BOARD_CREATE_SUCCESS:
      return {
        ...state,
        [payload.result.board]: board(state[payload.result.board], action),
      };
    default:
      return entity('boards')(state, action);
  }
}
