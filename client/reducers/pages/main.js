import update from 'react/lib/update';
import types from '../../constants/actionTypes';
import without from 'lodash/without';

export default function main(state = {
  ids: [],
  pageIndex: undefined,
  isLastPage: false,
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
        ids: [...state.ids, ...payload.result.boards],
        pageIndex: payload.request.pageIndex,
        isLastPage: !payload.result.nextPage,
        isFetching: false,
        lastUpdated: payload.receivedAt,
      };
    case types.BOARDS_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case types.BOARD_CREATE_SUCCESS:
      return {
        ...state,
        ids: [
          payload.result.board,
          ...(state.isLastPage ? state.ids : state.ids.slice(0, -1)),
        ],
      };
    case types.BOARD_REMOVE_SUCCESS:
      return {
        ...state,
        ids: without(state.ids, payload.result.board),
      };
    case types.BOARD_MOVE_SYNC:
      return {
        ...state,
        ...update(state, {
          ids: {
            $splice: [
              [state.ids.indexOf(payload.sourceId), 1],
              [state.ids.indexOf(payload.targetId), 0, payload.sourceId],
            ],
          },
        }),
      };
    case types.BOARD_MOVE_SUCCESS:
      return {
        ...state,
        lastUpdated: payload.receivedAt,
        ids: payload.result,
      };
    case types.BOARDS_SET_PAGE_INDEX:
      return {
        ...state,
        pageIndex: payload.pageIndex,
      };
    default:
      return state;
  }
}
