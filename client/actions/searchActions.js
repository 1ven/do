import types from '../constants/actionTypes';
import { createActions } from '../utils';

export const search = createActions([
  types.SEARCH_REQUEST,
  types.SEARCH_SUCCESS,
  types.SEARCH_ERROR,
]);

export function resetSearch() {
  return {
    type: types.SEARCH_RESET,
  };
}
