import types from '../constants/actionTypes';

export default function user(state = {
  id: undefined,
  lastUpdated: undefined,
  isFetching: false,
}, action) {
  switch (action.type) {
    case types.USER_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.USER_FETCH_SUCCESS:
      return {
        ...state,
        id: action.payload.result,
        isFetching: false,
        lastUpdated: action.payload.receivedAt,
      };
    case types.USER_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
