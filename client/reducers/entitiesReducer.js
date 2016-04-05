import merge from 'lodash/merge';

const initialState = { boards: {}, lists: {}, cards: {} };

export default function entities(state = initialState, action) {
    if (action.payload && action.payload.entities) {
        return merge({}, state, action.payload.entities);
    };

    return state;
};
