import types from '../constants/actionTypes';

export default function activity(state = {
  isFetching: false,
  lastUpdated: undefined,
}, action) {
  switch (action.type) {
    case types.ACTIVITY_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.ACTIVITY_FETCH_SUCCESS:
      return {
        ...state,
        lastUpdated: action.payload.receivedAt,
        isFetching: false,
      };
    case types.ACTIVITY_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
