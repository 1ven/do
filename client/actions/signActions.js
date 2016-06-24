import types from '../constants/actionTypes';
import { createActions } from '../utils';

export const signIn = createActions([
  types.SIGN_IN_REQUEST,
  types.SIGN_IN_SUCCESS,
  types.SIGN_IN_FAILURE,
]);

export const signUp = createActions([
  types.SIGN_UP_REQUEST,
  types.SIGN_UP_SUCCESS,
  types.SIGN_UP_FAILURE,
]);

export const signOut = createActions([
  types.SIGN_OUT_REQUEST,
  types.SIGN_OUT_SUCCESS,
  types.SIGN_OUT_FAILURE,
]);
