import * as types from '../constants/actionTypes';

export default function user(state = {
  id: undefined,
  isFetching: false,
  lastUpdated: undefined,
}, action) {
  switch (action.type) {
    case types.USER_GET_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.USER_GET_SUCCESS:
      return {
        ...state,
        id: action.payload.result,
        isFetching: false,
        lastUpdated: action.payload.receivedAt,
      };
    case types.USER_GET_ERROR:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
