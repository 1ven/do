import types from '../../constants/actionTypes';

const INITIAL_STATE = {
  message: undefined,
  errors: [],
};

export default function signIn(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SIGN_IN_SUCCESS:
      return INITIAL_STATE;
    case types.SIGN_IN_FAILURE:
      return {
        message: action.payload.message,
        errors: action.payload.errors,
      };
    default:
      return state;
  }
}
