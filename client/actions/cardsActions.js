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
  types.CARD_REMOVE_FAILURE,
]);

export const updateCard = createActions([
  types.CARD_UPDATE_REQUEST,
  types.CARD_UPDATE_SUCCESS,
  types.CARD_UPDATE_FAILURE,
]);

export const fetchCard = createActions([
  types.CARD_FETCH_REQUEST,
  types.CARD_FETCH_SUCCESS,
  types.CARD_FETCH_FAILURE,
]);

export const addColor = createActions([
  types.CARD_ADD_COLOR_REQUEST,
  types.CARD_ADD_COLOR_SUCCESS,
  types.CARD_ADD_COLOR_FAILURE,
]);

export const removeColor = createActions([
  types.CARD_REMOVE_COLOR_REQUEST,
  types.CARD_REMOVE_COLOR_SUCCESS,
  types.CARD_REMOVE_COLOR_FAILURE,
]);
