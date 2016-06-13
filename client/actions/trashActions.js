import { CALL_API } from '../middlewares/api';
import { TRASH_ARRAY, BOARD, LIST, CARD, ACTIVITY } from '../schemas';
import * as types from '../constants/actionTypes';

export function getTrash(pageIndex) {
  return {
    [CALL_API]: {
      types: [
        types.TRASH_FETCH_REQUEST,
        types.TRASH_FETCH_SUCCESS,
        types.TRASH_FETCH_ERROR,
      ],
      endpoint: `/api/trash/${pageIndex}`,
      schema: {
        trash: TRASH_ARRAY,
      },
      request: {
        method: 'get',
      },
    },
  };
}

export function restore(entryId, table) {
  return {
    [CALL_API]: {
      types: [
        types.TRASH_RESTORE_REQUEST,
        types.TRASH_RESTORE_SUCCESS,
        types.TRASH_RESTORE_ERROR,
      ],
      endpoint: `/api/trash/restore/${entryId}`,
      schema: {
        board: BOARD,
        list: LIST,
        card: CARD,
        activity: ACTIVITY,
      },
      request: {
        method: 'post',
        body: {
          table,
        },
      },
    },
  };
}
