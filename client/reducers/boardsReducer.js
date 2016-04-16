import merge from 'lodash/merge';
import * as types from '../constants/actionTypes';

const initialState = {
    ids: []
};

export default function boards(state = initialState,  action) {
    const { payload } = action;

    switch (action.type) {
        case types.BOARDS_GET_ALL_SUCCESS:
            return merge({}, state, {
                ids: payload.result
            });
        case types.BOARDS_CREATE_SUCCESS:
            return merge({}, state, {
                ids: [...state.ids, payload.result]
            });
        default:
            return state;
    }
};
