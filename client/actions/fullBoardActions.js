import { CALL_API } from '../middlewares/api';
import { BOARD } from '../schemas';
import * as types from '../constants/actionTypes';

export function getFullBoard(id) {
    return {
        [CALL_API]: {
            types: [
                types.FULL_BOARD_GET_REQUEST,
                types.FULL_BOARD_GET_SUCCESS,
                types.FULL_BOARD_GET_ERROR
            ],
            endpoint: '/boards/get-full',
            schema: BOARD,
            request: {
                method: 'post',
                body: {
                    id
                }
            }
        }
    };
};
