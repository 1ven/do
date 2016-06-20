import * as types from '../../constants/actionTypes';

export default function signUp(state = [], action) {
  switch (action.type) {
    case types.SIGN_UP_SUCCESS:
      return [];
    case types.SIGN_UP_ERROR:
      return action.payload.result;
    default:
      return state;
  }
}
