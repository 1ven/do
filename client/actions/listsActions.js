import types from '../constants/actionTypes';
import { createActions } from '../utils';

export const createList = createActions([
  types.LIST_CREATE_REQUEST,
  types.LIST_CREATE_SUCCESS,
  types.LIST_CREATE_FAILURE,
]);
