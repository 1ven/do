import merge from 'lodash/merge';
import without from 'lodash/without';
import assign from 'lodash/assign';
import * as types from '../constants/actionTypes';

export default function entities(state = {}, action) {
    const payload = action.payload;

    if (payload && payload.entities) {
        return merge({}, state, payload.entities);
    };

    return {
        boards: boardsReducer(state.boards, action),
        lists: listsReducer(state.lists, action),
        cards: state.cards || {},
        users: state.users || {},
        comments: state.comments || {}
    }
};

function boardsReducer(state = {}, action) {
    const payload = action.payload;

    switch (action.type) {
        case types.BOARDS_ADD_LIST_ID: {
            const { boardId, listId } = payload;
            const lists = state[boardId].lists || [];

            return merge({}, state, {
                [boardId]: {
                    lists: [...lists, listId]
                }
            });
        }
        case types.BOARDS_REMOVE_LIST_ID: {
            const { boardId, listId } = payload;
            const lists = state[boardId].lists || [];

            return assign({}, state, {
                [boardId]: assign({}, state[boardId], {
                    lists: without(lists, listId)
                })
            });
        }
        default:
            return state;
    }
};

function listsReducer(state = {}, action) {
    const payload = action.payload;

    switch (action.type) {
        case types.LISTS_ADD_CARD_ID: {
            // TODO: Remove variables duplicating.
            const { listId, cardId } = payload;
            const cards = state[listId].cards || [];

            return merge({}, state, {
                [listId]: {
                    cards: [...cards, cardId]
                }
            });
        }
        case types.LISTS_REMOVE_CARD_ID: {
            const { listId, cardId } = payload;
            const cards = state[listId].cards || [];

            return assign({}, state, {
                [listId]: assign({}, state[listId], {
                    cards: without(cards, cardId)
                })
            });
        }
        default:
            return state;
    }
};
