import { combineReducers } from 'redux';
import update from 'react/lib/update';
import types from '../../constants/actionTypes';
import without from 'lodash/without';

function allBoards(state = {
  ids: [],
  pageIndex: undefined,
  count: 0,
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
        count: + payload.result.count,
        isLastPage: !payload.result.nextPage,
        isFetching: false,
        lastUpdated: payload.receivedAt,
        error: undefined,
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
        count: state.count + 1,
        ids: [
          payload.result.board,
          ...(state.isLastPage ? state.ids : state.ids.slice(0, -1)),
        ],
      };
    case types.BOARD_REMOVE_SUCCESS:
      return {
        ...state,
        count: state.count - 1,
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
    case types.BOARD_ADD:
      return {
        ...state,
        ids: [...state.ids, payload.result.boards[0]],
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

function starredBoards(state = {
  ids: [],
  isFetching: false,
  lastUpdated: undefined,
  error: undefined,
}, action) {
  const { payload } = action;

  switch (action.type) {
    case types.BOARDS_FETCH_STARRED_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.BOARDS_FETCH_STARRED_SUCCESS:
      return {
        ...state,
        ids: [...state.ids, ...payload.result.boards],
        isFetching: false,
        lastUpdated: payload.receivedAt,
        error: undefined,
      };
    case types.BOARDS_FETCH_STARRED_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case types.BOARD_TOGGLE_STARRED_SUCCESS: {
      const boardId = payload.result.board;
      const ids = payload.entities.boards[boardId].starred ?
        [...state.ids, boardId] : state.ids.filter(id => id !== boardId);

      return {
        ...state,
        ids,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  all: allBoards,
  starred: starredBoards,
});
