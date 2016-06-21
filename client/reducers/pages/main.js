import types from '../../constants/actionTypes';
import without from 'lodash/without';

export default function main(state = {
  ids: [],
  isFetching: false,
  lastUpdated: undefined,
  error: undefined,
}, action) {
  const { payload } = action;

  switch (action.type) {
    case types.BOARDS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.BOARDS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: payload.result,
        lastUpdated: payload.receivedAt,
      };
    case types.BOARDS_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    /* case types.BOARDS_CREATE_SUCCESS: */
    /*   return { */
    /*     ...state, */
    /*     ids: [...state.ids, payload.result.board], */
    /*   }; */
    /* case types.BOARDS_REMOVE_SUCCESS: */
    /*   return { */
    /*     ...state, */
    /*     ids: without(state.ids, payload.result.board), */
    /*   }; */
    default:
      return state;
  }
}
