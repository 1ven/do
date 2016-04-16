import { CALL_API } from '../middlewares/api';
import { BOARD_ARRAY, BOARD } from '../schemas';
import * as types from '../constants/actionTypes';

export function getBoards() {
    return {
        [CALL_API]: {
            types: [
                types.BOARDS_GET_REQUEST,
                types.BOARDS_GET_SUCCESS,
                types.BOARDS_GET_ERROR
            ],
            endpoint: '/boards',
            schema: BOARD_ARRAY,
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
            endpoint: '/boards',
            schema: BOARD,
            request: {
                method: 'post',
                body: { title }
            }
        }
    };
};
