import types from '../constants/actionTypes';
import { createActions } from '../utils';

export const fetchTrash = createActions([
  types.TRASH_FETCH_REQUEST,
  types.TRASH_FETCH_SUCCESS,
  types.TRASH_FETCH_ERROR,
]);
