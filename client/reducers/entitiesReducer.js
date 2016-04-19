import merge from 'lodash/merge';
import * as types from '../constants/actionTypes';

export default function entities(state = {}, action) {
    const payload = action.payload;

    if (payload && payload.entities) {
        return merge({}, state, payload.entities);
    };

    return {
        boards: state.boards || {},
        lists: listsReducer(state.lists, action),
        cards: state.cards || {}
    }
};

function listsReducer(state = {}, action) {
    const payload = action.payload;

    switch (action.type) {
        case types.LISTS_ADD_CARD_ID:
            const { listId, cardId } = payload;
            return merge({}, state, {
                [listId]: {
                    cards: [...state[listId].cards, cardId]
                }
            });
        default:
            return state;
    }
};
