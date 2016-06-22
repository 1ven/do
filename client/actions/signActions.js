import types from '../constants/actionTypes';
import { createActions } from '../utils';

export const signIn = createSignActions([
  types.SIGN_IN_REQUEST,
  types.SIGN_IN_SUCCESS,
  types.SIGN_IN_FAILURE,
]);

export const signUp = createSignActions([
  types.SIGN_UP_REQUEST,
  types.SIGN_UP_SUCCESS,
  types.SIGN_UP_FAILURE,
]);

export const signOut = createActions([
  types.SIGN_OUT_REQUEST,
  types.SIGN_OUT_SUCCESS,
  types.SIGN_OUT_FAILURE,
]);

function createSignActions(types) {
  return {
    request: (payload) => ({
      type: types[0],
      payload,
    }),
    success: (payload) => ({
      type: types[1],
      payload,
    }),
    failure: (message, errors) => ({
      type: types[2],
      payload: {
        message,
        errors,
      },
    }),
  };
}
