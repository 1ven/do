import assign from 'lodash/assign';
import without from 'lodash/without';
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
        case types.BOARDS_REMOVE_SUCCESS:
            return assign({}, state, {
                ids: without(state.ids, payload.result.id)
            });
        default:
            return state;
    }
};

function boardReducer(state = {}, action) {
    switch (action.type) {
        case types.BOARDS_GET_REQUEST:
            return assign({}, state, {
                [action.payload.id]: {
                    isFetching: true
                }
            });
        case types.BOARDS_GET_SUCCESS:
            return assign({}, state, {
                [action.payload.result]: {
                    isFetching: false,
                    lastUpdated: action.payload.receivedAt
                }
            });
        case types.BOARDS_GET_ERROR:
            return assign({}, state, {
                [action.payload.result]: {
                    isFetching: false
                }
            });
        default:
            return state;
    }
};

function signUpReducer(state = [], action) {
    switch (action.type) {
        case types.SIGN_UP_SUCCESS:
            return [];
        case types.SIGN_UP_ERROR:
            return action.payload.result;
        default:
            return state;
    }
};

function signInReducer(state = [], action) {
    switch (action.type) {
        case types.SIGN_IN_SUCCESS:
            return [];
        case types.SIGN_IN_ERROR:
            return action.payload.result;
        default:
            return state;
    }
}

export default combineReducers({
    index: indexReducer,
    board: boardReducer,
    signUp: signUpReducer,
    signIn: signInReducer
});
