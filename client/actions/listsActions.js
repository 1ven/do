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

export const updateList = createActions([
  types.LIST_UPDATE_REQUEST,
  types.LIST_UPDATE_SUCCESS,
  types.LIST_UPDATE_FAILURE,
]);

export function addCardId(listId, cardId) {
  return {
    type: types.LIST_ADD_CARD_ID,
    payload: {
      listId,
      cardId,
    },
  };
}

export function removeCardId(listId, cardId) {
  return {
    type: types.LIST_REMOVE_CARD_ID,
    payload: {
      listId,
      cardId,
    },
  };
};
