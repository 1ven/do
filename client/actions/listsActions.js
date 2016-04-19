import { CALL_API } from '../middlewares/api';
import { LIST } from '../schemas';
import * as types from '../constants/actionTypes';

export function addCardId(listId, cardId) {
    return {
        type: types.LISTS_ADD_CARD_ID,
        payload: {
            listId,
            cardId
        }
    };
};

export function createList(boardId, title) {
    return {
        [CALL_API]: {
            types: [
                types.LISTS_CREATE_REQUEST,
                types.LISTS_CREATE_SUCCESS,
                types.LISTS_CREATE_ERROR,
            ],
            endpoint: `/api/boards/${boardId}/lists`,
            schema: LIST,
            request: {
                method: 'post',
                body: {
                    title
                }
            }
        }
    };
};
