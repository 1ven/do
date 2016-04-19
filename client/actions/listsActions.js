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
