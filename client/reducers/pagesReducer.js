import assign from 'lodash/assign';
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
            return assign({}, state, {
                isFetching: true
            });
        case types.BOARDS_GET_ALL_SUCCESS:
            return assign({}, state, {
                isFetching: false,
                ids: payload.result,
                lastUpdated: payload.receivedAt
            });
        case types.BOARDS_GET_ALL_ERROR:
            return assign({}, state, {
                isFetching: false
            });
        case types.BOARDS_CREATE_SUCCESS:
            return assign({}, state, {
                ids: [...state.ids, payload.result] 
            });
        default:
            return state;
    }
};

function boardReducer(state = {
    isFetching: false,
    lastUpdated: undefined
}, action) {
    switch (action.type) {
        case types.BOARDS_GET_REQUEST:
            return assign({}, state, {
                isFetching: true
            });
        case types.BOARDS_GET_SUCCESS:
            return assign({}, state, {
                isFetching: false,
                lastUpdated: action.payload.receivedAt
            });
        case types.BOARDS_GET_ERROR:
            return assign({}, state, {
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
