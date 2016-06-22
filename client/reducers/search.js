import types from '../constants/actionTypes';

export default function search(state = {
  results: [],
}, action) {
  switch (action.type) {
    case types.SEARCH_SUCCESS:
      return {
        results: action.payload.result
      };
    default:
      return state;
  }
}
