import { CALL_API } from '../middlewares/api';
import { BOARD_ARRAY, BOARD } from '../schemas';
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
};

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
            request: {
                method: 'get',
            }
        }
    };
};

export function createBoard(title) {
    return {
        [CALL_API]: {
            types: [
                types.BOARDS_CREATE_REQUEST,
                types.BOARDS_CREATE_SUCCESS,
                types.BOARDS_CREATE_ERROR
            ],
            endpoint: '/api/boards',
            schema: BOARD,
            request: {
                method: 'post',
                body: { title }
            }
        }
    };
};

export function removeBoard(id) {
    return {
        [CALL_API]: {
            types: [
                types.BOARDS_REMOVE_REQUEST,
                types.BOARDS_REMOVE_SUCCESS,
                types.BOARDS_REMOVE_ERROR
            ],
            endpoint: '/api/boards/' + id,
            request: {
                method: 'delete'
            }
        }
    };
};

export function addListId(boardId, listId) {
    return {
        type: types.BOARDS_ADD_LIST_ID,
        payload: {
            boardId,
            listId
        }
    };
};

export function removeListId(boardId, listId) {
    return {
        type: types.BOARDS_REMOVE_LIST_ID,
        payload: {
            boardId,
            listId
        }
    };
};
