import merge from 'lodash/merge';
import * as types from '../constants/actionTypes';
import { combineReducers } from 'redux';

function indexReducer(state = {
    boardsIds: [],
    loading: false
}, action) {
    const payload = action.payload;

    switch (action.type) {
        case types.BOARDS_GET_ALL_REQUEST:
            return merge({}, state, {
                loading: true
            });
        case types.BOARDS_GET_ALL_SUCCESS:
            return merge({}, state, {
                loading: false,
                boardsIds: payload.result
            });
        case types.BOARDS_GET_ALL_ERROR:
            return merge({}, state, {
                loading: false
            });
        default:
            return state;
    }
};

function boardReducer(state = {
    loading: false
}, action) {
    switch (action.type) {
        case types.BOARDS_GET_REQUEST:
            return merge({}, state, {
                loading: true
            });
        case types.BOARDS_GET_SUCCESS:
            return merge({}, state, {
                loading: false,
            });
        case types.BOARDS_GET_ERROR:
            return merge({}, state, {
                loading: false
            });
        default:
            return state;
    }
};

export default combineReducers({
    index: indexReducer,
    board: boardReducer
});
