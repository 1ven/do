import * as types from '../../constants/actionTypes';

export default function signIn(state = [], action) {
  switch (action.type) {
    case types.SIGN_IN_SUCCESS:
      return [];
    case types.SIGN_IN_ERROR:
      return action.payload.result;
    default:
      return state;
  }
}
