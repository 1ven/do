import * as types from '../constants/actionTypes';
import assign from 'lodash/assign';

function userReducer(state = {
  id: undefined,
  isFetching: false,
  lastUpdated: undefined,
}, action) {
  switch (action.type) {
    case types.USER_GET_REQUEST:
      return assign({}, state, {
        isFetching: true,
      });
    case types.USER_GET_SUCCESS:
      return assign({}, state, {
        id: action.payload.result,
        isFetching: false,
        lastUpdated: action.payload.receivedAt,
      });
    case types.USER_GET_ERROR:
      return assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
}

export default userReducer;
