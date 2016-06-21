import types from '../constants/actionTypes';
import { createActions } from '../utils';

export const fetchBoards = createActions([
  types.BOARDS_FETCH_REQUEST,
  types.BOARDS_FETCH_SUCCESS,
  types.BOARDS_FETCH_FAILURE,
]);

export const createBoard = createActions([
  types.BOARD_CREATE_REQUEST,
  types.BOARD_CREATE_SUCCESS,
  types.BOARD_CREATE_FAILURE,
]);
