import { CALL_API } from '../middlewares/api';
import { BOARD_ARRAY, BOARD, ACTIVITY, TRASH } from '../schemas';
import * as types from '../constants/actionTypes';

export function getBoards() {
  return {
    [CALL_API]: {
      types: [
        types.BOARDS_GET_ALL_REQUEST,
        types.BOARDS_GET_ALL_SUCCESS,
        types.BOARDS_GET_ALL_ERROR
      ],
      endpoint: '/api/boards',
      schema: BOARD_ARRAY,
      request: {
        method: 'get',
      }
    }
  };
}

export function getBoard(id) {
  return {
    [CALL_API]: {
      types: [
        types.BOARDS_GET_REQUEST,
        types.BOARDS_GET_SUCCESS,
        types.BOARDS_GET_ERROR
      ],
      endpoint: '/api/boards/' + id,
      schema: BOARD,
      requestPayload: { id },
      request: {
        method: 'get',
      }
    }
  };
}

export function createBoard(title) {
  return {
    [CALL_API]: {
      types: [
        types.BOARDS_CREATE_REQUEST,
        types.BOARDS_CREATE_SUCCESS,
        types.BOARDS_CREATE_ERROR
      ],
      endpoint: '/api/boards',
      schema: {
        board: BOARD,
        activity: ACTIVITY,
      },
      request: {
        method: 'post',
        body: {
          title
        },
      },
    },
  };
}

export function removeBoard(id) {
  return {
    [CALL_API]: {
      types: [
        types.BOARDS_REMOVE_REQUEST,
        types.BOARDS_REMOVE_SUCCESS,
        types.BOARDS_REMOVE_ERROR,
      ],
      endpoint: '/api/boards/' + id,
      schema: {
        board: BOARD,
        trashItem: TRASH,
        activity: ACTIVITY,
      },
      request: {
        method: 'delete',
      },
    },
  };
}

export function updateBoard(id, props, activityAction) {
  const queryParams = activityAction ? '?activityAction=' + activityAction : '';
  return {
    [CALL_API]: {
      types: [
        types.BOARDS_UPDATE_REQUEST,
        types.BOARDS_UPDATE_SUCCESS,
        types.BOARDS_UPDATE_ERROR,
      ],
      endpoint: `/api/boards/${id}${queryParams}`,
      schema: {
        board: BOARD,
        activity: ACTIVITY,
      },
      request: {
        method: 'put',
        body: props
      },
    },
  };
}

export function toggleStarred(boardId) {
  return {
    [CALL_API]: {
      types: [
        types.BOARDS_TOGGLE_STARRED_REQUEST,
        types.BOARDS_TOGGLE_STARRED_SUCCESS,
        types.BOARDS_TOGGLE_STARRED_ERROR,
      ],
      endpoint: `/api/boards/${boardId}/toggleStarred`,
      schema: BOARD,
      request: {
        method: 'POST'
      },
    },
  };
}
