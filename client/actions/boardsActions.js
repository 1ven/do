import types from '../constants/actionTypes';
import { createActions } from '../utils';

export const fetchBoards = createActions([
  types.BOARDS_FETCH_REQUEST,
  types.BOARDS_FETCH_SUCCESS,
  types.BOARDS_FETCH_FAILURE,
]);
