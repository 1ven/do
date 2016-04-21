import merge from 'lodash/merge';
import * as types from '../constants/actionTypes';
import { combineReducers } from 'redux';

function indexReducer(state = {
    ids: [],
    isFetching: false,
    lastUpdated: undefined
}, action) {
    const payload = action.payload;

    switch (action.type) {
        case types.BOARDS_GET_ALL_REQUEST:
            return merge({}, state, {
                isFetching: true
            });
        case types.BOARDS_GET_ALL_SUCCESS:
            return merge({}, state, {
                isFetching: false,
                ids: payload.result,
                lastUpdated: payload.receivedAt
            });
        case types.BOARDS_GET_ALL_ERROR:
            return merge({}, state, {
                isFetching: false
            });
        case types.BOARDS_CREATE_SUCCESS:
            return merge({}, state, {
                ids: [...state.ids, payload.result] 
            });
        default:
            return state;
    }
};

// write tests for pagesReducer
function boardReducer(state = {
    id: undefined,
    isFetching: false,
    lastUpdated: undefined
}, action) {
    switch (action.type) {
        case types.BOARDS_GET_REQUEST:
            return merge({}, state, {
                isFetching: true
            });
        case types.BOARDS_GET_SUCCESS:
            return merge({}, state, {
                id: action.payload.result,
                isFetching: false,
                lastUpdated: action.payload.receivedAt
            });
        case types.BOARDS_GET_ERROR:
            return merge({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
};

export default combineReducers({
    index: indexReducer,
    board: boardReducer
});
