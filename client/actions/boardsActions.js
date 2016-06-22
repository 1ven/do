import types from '../constants/actionTypes';
import { createActions } from '../utils';

export const fetchBoards = createActions([
  types.BOARDS_FETCH_REQUEST,
  types.BOARDS_FETCH_SUCCESS,
  types.BOARDS_FETCH_FAILURE,
]);

export const fetchBoard = createActions([
  types.BOARD_FETCH_REQUEST,
  types.BOARD_FETCH_SUCCESS,
  types.BOARD_FETCH_FAILURE,
]);

export const createBoard = createActions([
  types.BOARD_CREATE_REQUEST,
  types.BOARD_CREATE_SUCCESS,
  types.BOARD_CREATE_FAILURE,
]);

export const removeBoard = createActions([
  types.BOARD_REMOVE_REQUEST,
  types.BOARD_REMOVE_SUCCESS,
  types.BOARD_REMOVE_FAILURE,
]);

export const updateBoard = createActions([
  types.BOARD_UPDATE_REQUEST,
  types.BOARD_UPDATE_SUCCESS,
  types.BOARD_UPDATE_FAILURE,
]);

export function addListId(boardId, listId) {
  return {
    type: types.BOARD_ADD_LIST_ID,
    payload: {
      boardId,
      listId,
    },
  };
}

export function removeListId(boardId, listId) {
  return {
    type: types.BOARD_REMOVE_LIST_ID,
    payload: {
      boardId,
      listId,
    },
  };
}

export function incListsLength(boardId) {
  return {
    type: types.BOARD_INC_LISTS_LENGTH,
    payload: {
      boardId,
    },
  };
}

export function decListsLength(boardId) {
  return {
    type: types.BOARD_DEC_LISTS_LENGTH,
    payload: {
      boardId
    }
  };
}

export function incCardsLength(boardId) {
  return {
    type: types.BOARD_INC_CARDS_LENGTH,
    payload: {
      boardId,
    }
  };
}

export function decCardsLength(boardId, count) {
  return {
    type: types.BOARD_DEC_CARDS_LENGTH,
    payload: {
      boardId,
      count,
    },
  };
}
