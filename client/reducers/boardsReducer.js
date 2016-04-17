import merge from 'lodash/merge';
import * as types from '../constants/actionTypes';

const initialState = {
    ids: [],
    loading: false
};

export default function boards(state = initialState,  action) {
    const { payload } = action;

    switch (action.type) {
        case types.BOARDS_GET_ALL_REQUEST:
            return merge({}, state, {
                loading: true
            });
        case types.BOARDS_GET_ALL_ERROR:
            return merge({}, state, {
                loading: false
            });
        case types.BOARDS_GET_ALL_SUCCESS:
            return merge({}, state, {
                ids: payload.result,
                loading: false
            });
        case types.BOARDS_CREATE_SUCCESS:
            return merge({}, state, {
                ids: [...state.ids, payload.result]
            });
        default:
            return state;
    }
};
