import merge from 'lodash/merge';
import * as types from '../constants/actionTypes';

export default function entities(state = {}, action) {
    const payload = action.payload;

    if (payload && payload.entities) {
        return merge({}, state, payload.entities);
    };

    return {
        boards: boardsReducer(state.boards, action),
        lists: listsReducer(state.lists, action),
        cards: state.cards || {}
    }
};

function boardsReducer(state = {}, action) {
    const payload = action.payload;

    switch (action.type) {
        case types.BOARDS_ADD_LIST_ID:
            const { boardId, listId } = payload;
            const lists = state[boardId].lists || [];

            return merge({}, state, {
                [boardId]: {
                    lists: [...lists, listId]
                }
            });
        default:
            return state;
    }
};

function listsReducer(state = {}, action) {
    const payload = action.payload;

    switch (action.type) {
        case types.LISTS_ADD_CARD_ID:
            const { listId, cardId } = payload;
            const cards = state[listId].cards || [];

            return merge({}, state, {
                [listId]: {
                    cards: [...cards, cardId]
                }
            });
        default:
            return state;
    }
};
