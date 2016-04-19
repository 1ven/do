import { CALL_API } from '../middlewares/api';
import { CARD } from '../schemas';
import * as types from '../constants/actionTypes';

export function createCard(listId, text) {
    return {
        [CALL_API]: {
            types: [
                types.CARDS_CREATE_REQUEST,
                types.CARDS_CREATE_SUCCESS,
                types.CARDS_CREATE_ERROR
            ],
            endpoint: `/api/lists/${listId}/cards`,
            schema: CARD,
            request: {
                method: 'post',
                body: {
                    text
                }
            }
        }
    };
};
