import types from '../constants/actionTypes';
import { createActions } from '../utils';

export const createComment = createActions([
  types.COMMENT_CREATE_REQUEST,
  types.COMMENT_CREATE_SUCCESS,
  types.COMMENT_CREATE_FAILURE,
]);
