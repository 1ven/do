import types from '../constants/actionTypes';
import { createActions } from '../utils';

export const fetchUser = createActions([
  types.USER_FETCH_REQUEST,
  types.USER_FETCH_SUCCESS,
  types.USER_FETCH_FAILURE,
]);
