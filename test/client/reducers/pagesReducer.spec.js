import { assert } from 'chai';
import _ from 'lodash';
import * as types from 'client/constants/actionTypes';
import pagesReducer from 'client/reducers/pagesReducer';

function getState(customState = {}) {
    return _.merge({}, {
        index: {
            ids: [],
            isFetching: false,
            lastUpdated: undefined
        },
        board: {
            id: undefined,
            isFetching: false,
            lastUpdated: undefined
        }
    }, customState);
};

describe('pagesReducer', () => {
    it('should return initialState', () => {
        const nextState = pagesReducer(undefined, {});
        assert.deepEqual(nextState, getState());
    });

    it('should handle BOARDS_GET_ALL_REQUEST', () => {
        const nextState = pagesReducer(getState(), {
            type: types.BOARDS_GET_ALL_REQUEST
        });
        assert.deepEqual(nextState, getState({
            index: {
                isFetching: true,
            }
        }));
    });

    it('should handle BOARDS_GET_ALL_SUCCESS', () => {
        const prevState = getState({
            index: {
                isFetching: true,
            }
        });
        const nextState = pagesReducer(prevState, {
            type: types.BOARDS_GET_ALL_SUCCESS,
            payload: {
                result: [1, 2],
                receivedAt: 1
            }
        });
        assert.deepEqual(nextState, getState({
            index: {
                isFetching: false,
                ids: [1, 2],
                lastUpdated: 1
            }
        }));
    });

    it('should handle BOARDS_GET_ALL_ERROR', () => {
        const prevState = getState({
            index: {
                isFetching: true,
            }
        });
        const nextState = pagesReducer(prevState, {
            type: types.BOARDS_GET_ALL_ERROR
        });
        assert.deepEqual(nextState, getState({
            index: {
                isFetching: false
            }
        }));
    });

    it('should handle BOARDS_CREATE_SUCCESS', () => {
        const prevState = getState();
        const nextState = pagesReducer(prevState, {
            type: types.BOARDS_CREATE_SUCCESS,
            payload: {
                result: 1
            }
        });
        assert.deepEqual(nextState, getState({
            index: {
                ids: [1]
            }
        }));
    });

    it('should handle BOARDS_GET_REQUEST', () => {
        const nextState = pagesReducer(getState(), {
            type: types.BOARDS_GET_REQUEST
        });
        assert.deepEqual(nextState, getState({
            board: {
                isFetching: true,
            }
        }));
    });

    it('should handle BOARDS_GET_SUCCESS', () => {
        const prevState = getState({
            board: {
                isFetching: true,
            }
        });
        const nextState = pagesReducer(prevState, {
            type: types.BOARDS_GET_SUCCESS,
            payload: {
                result: 5,
                receivedAt: 1
            }
        });
        assert.deepEqual(nextState, getState({
            board: {
                isFetching: false,
                id: 5,
                lastUpdated: 1
            }
        }));
    });

    it('should handle BOARDS_GET_ERROR', () => {
        const prevState = getState({
            board: {
                isFetching: true,
            }
        });
        const nextState = pagesReducer(prevState, {
            type: types.BOARDS_GET_ERROR
        });
        assert.deepEqual(nextState, getState({
            board: {
                isFetching: false
            }
        }));
    });
});
