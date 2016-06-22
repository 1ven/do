import types from '../constants/actionTypes';
import { createActions } from '../utils';

export const createCard = createActions([
  types.CARD_CREATE_REQUEST,
  types.CARD_CREATE_SUCCESS,
  types.CARD_CREATE_FAILURE,
]);

export const removeCard = createActions([
  types.CARD_REMOVE_REQUEST,
  types.CARD_REMOVE_SUCCESS,
  types.CARD_REMOVE_ERROR,
]);
