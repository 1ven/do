import types from '../constants/actionTypes';

export default function search(state = {
  results: [],
  isFetching: false,
  lastUpdated: undefined,
}, action) {
  switch (action.type) {
    case types.SEARCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.SEARCH_SUCCESS:
      return {
        results: action.payload.result,
        isFetching: false,
        lastUpdated: action.payload.receivedAt,
      };
    default:
      return state;
  }
}
