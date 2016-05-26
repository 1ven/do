import { CALL_API } from '../middlewares/api';
import { COMMENT } from '../schemas';
import * as types from '../constants/actionTypes';

export function createComment(cardId, text) {
    return {
        [CALL_API]: {
            types: [
                types.COMMENTS_CREATE_REQUEST,
                types.COMMENTS_CREATE_SUCCESS,
                types.COMMENTS_CREATE_ERROR
            ],
            endpoint: `/api/cards/${cardId}/comments`,
            schema: COMMENT,
            request: {
                method: 'post',
                body: {
                    text
                }
            }
        }
    };
};
