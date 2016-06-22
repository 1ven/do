import types from '../constants/actionTypes';
import { createActions } from '../utils';

export const fetchActivity = createActions([
  types.ACTIVITY_FETCH_REQUEST,
  types.ACTIVITY_FETCH_SUCCESS,
  types.ACTIVITY_FETCH_FAILURE,
]);
