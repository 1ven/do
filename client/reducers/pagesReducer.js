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

// mb store board id in reducer
// merge two reducers into one common
// write tests for pagesReducer
function boardReducer(state = {
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

function createPageReducer(additionalState, actions, onSuccess) {
    if (!(actions instanceof Array)) {
        throw new Error('Expected `actions` to be an array');
    }

    if (!isPlainObject(additionalState)) {
        throw new Error('Expected `additionalState` to be a plain object');
    }

    if (typeof onSuccess !== 'function') {
        throw new Error('Expected `onSuccess` to be a function');
    }

    if (actions.length !== 3) {
        throw new Error('Expected actions count to be 3');
    }

    const initialState = merge({}, {
        isFetching: false,
        lastUpdated: undefined
    }, additionalState);

    return function(state = initialState, action) {
        switch (action.type) {
            case actions[0]:
                return merge({}, state, {
                    isFetching: true
                });
            case actions[1]:
                return merge({}, state, {
                    isFetching: false,
                    lastUpdated: action.payload.receivedAt
                }, onSuccess(state, action.payload));
            case actions[2]:
                return merge({}, state, {
                    isFetching: false
                });
            default:
                return state;
        }
    };
};

const indexReducer = createPageReducer({
    ids: []
}, [
    types.BOARDS_GET_ALL_REQUEST,
    types.BOARDS_GET_ALL_SUCCESS,
    types.BOARDS_GET_ALL_ERROR
], (state, payload) => {
    return {
        ids: payload.result
    };
});

const boardReducer = createPageReducer({
    id: undefined
}, [
    types.BOARDS_GET_REQUEST,
    types.BOARDS_GET_SUCCESS,
    types.BOARDS_GET_ERROR
], (state, payload) => {
    return {
        id: payload.result
    };
});

export default combineReducers({
    index: indexReducer,
    board: boardReducer
});
