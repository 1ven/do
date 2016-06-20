import * as types from '../../constants/actionTypes';

export default function board(state = {}, action) {
  const { payload } = action;

  switch (action.type) {
    case types.BOARDS_GET_REQUEST:
      return {
        ...state,
        [payload.id]: {
          isFetching: true,
        },
      };
    case types.BOARDS_GET_SUCCESS:
      return {
        ...state,
        [payload.result]: {
          isFetching: false,
          lastUpdated: payload.receivedAt,
        },
      };
    case types.BOARDS_GET_ERROR:
      return {
        ...state,
        [payload.result]: {
          isFetching: false,
        },
      };
    default:
      return state;
  }
}
