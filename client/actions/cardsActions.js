import types from '../constants/actionTypes';
import { createActions } from '../utils';

export const createCard = createActions([
  types.CARD_CREATE_REQUEST,
  types.CARD_CREATE_SUCCESS,
  types.CARD_CREATE_FAILURE,
]);
