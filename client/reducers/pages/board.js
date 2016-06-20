import * as types from '../../constants/actionTypes';

export default function board(state = {}, action) {
  switch (action.type) {
    case types.BOARDS_GET_REQUEST:
      return {
        ...state,
        [action.payload.id]: {
          isFetching: true,
        },
      };
    case types.BOARDS_GET_SUCCESS:
      return {
        ...state,
        [action.payload.result]: {
          isFetching: false,
          lastUpdated: action.payload.receivedAt,
        },
      };
    case types.BOARDS_GET_ERROR:
      return {
        ...state,
        [action.payload.result]: {
          isFetching: false,
        },
      };
    default:
      return state;
  }
}
