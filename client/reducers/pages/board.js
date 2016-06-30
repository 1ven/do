import types from '../../constants/actionTypes';

export default function board(state = {}, action) {
  const { payload } = action;

  switch (action.type) {
    case types.BOARD_FETCH_REQUEST:
      return {
        ...state,
        [payload.id]: {
          isFetching: true,
        },
      };
    case types.BOARD_FETCH_SUCCESS:
      return {
        ...state,
        [payload.result]: {
          isFetching: false,
          lastUpdated: payload.receivedAt,
        },
      };
    case types.BOARD_FETCH_ERROR:
      return {
        ...state,
        [payload.result]: {
          error: true,
          isFetching: false,
        },
      };
    default:
      return state;
  }
}
