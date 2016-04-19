import merge from 'lodash/merge';
import * as types from '../constants/actionTypes';

const initialState = { boards: {}, lists: {}, cards: {} };

export default function entities(state = initialState, action) {
    const payload = action.payload;

    if (payload && payload.entities) {
        return merge({}, state, payload.entities);
    };

    // TODO: Reducers composition.
    switch (action.type) {
        case types.LISTS_ADD_CARD_ID:
            const { listId, cardId } = payload;
            return merge({}, state, {
                lists: {
                    [listId]: {
                        cards: [...state.lists[listId].cards, cardId]
                    }
                }
            });
        default:
            return state;
    }
};
