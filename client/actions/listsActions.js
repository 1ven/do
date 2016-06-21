import types from '../constants/actionTypes';
import { createActions } from '../utils';

export const createList = createActions([
  types.LIST_CREATE_REQUEST,
  types.LIST_CREATE_SUCCESS,
  types.LIST_CREATE_FAILURE,
]);

export const removeList = createActions([
  types.LIST_REMOVE_REQUEST,
  types.LIST_REMOVE_SUCCESS,
  types.LIST_REMOVE_FAILURE,
]);
