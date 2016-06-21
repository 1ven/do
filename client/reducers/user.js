import * as types from '../constants/actionTypes';

export default function user(state = {
  id: undefined,
}, action) {
  switch (action.type) {
    case types.USER_FETCH_SUCCESS:
      return {
        ...state,
        id: action.payload.result,
      };
    default:
      return state;
  }
}
