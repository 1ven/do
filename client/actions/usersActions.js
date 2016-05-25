import { CALL_API } from '../middlewares/api';
import { USER } from '../schemas';
import * as types from '../constants/actionTypes';

export function getUser(listId, text) {
    return {
        [CALL_API]: {
            types: [
                types.USER_GET_REQUEST,
                types.USER_GET_SUCCESS,
                types.USER_GET_ERROR
            ],
            endpoint: `/api/user`,
            schema: USER,
            request: {
                method: 'get'
            }
        }
    };
};
