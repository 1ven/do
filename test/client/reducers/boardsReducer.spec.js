import { assert } from 'chai';
import boardsReducer from 'client/reducers/boardsReducer';
import * as types from 'client/constants/actionTypes';

describe('boards reducer', () => {
    it('should return initial state', () => {
        const nextState = boardsReducer(undefined, {});
        const expectedState = {
            loading: false,
            items: []
        };
        assert.deepEqual(nextState, expectedState);
    });

    it('should handle BOARDS_GET_REQUEST', () => {
        const action = {
            type: types.BOARDS_GET_REQUEST
        };
        const state = { items: [], loading: false };
        const expectedState = { items: [], loading: true };
        const nextState = boardsReducer(state, action);

        assert.deepEqual(nextState, expectedState);
    });

    it('should handle BOARDS_GET_SUCCESS', () => {
        const boards = [
            { id: 1, title: 'board 1' },
            { id: 2, title: 'board 2' }
        ];
        const action = {
            type: types.BOARDS_GET_SUCCESS,
            payload: boards
        };
        const state = { items: [], loading: true };
        const expectedState = { items: boards, loading: false };
        const nextState = boardsReducer(state, action);

        assert.deepEqual(nextState, expectedState);
    });

    it('should handle BOARDS_GET_ERROR', () => {
        const action = {
            type: types.BOARDS_GET_ERROR,
            payload: new Error('Test error'),
            error: true
        };
        const state = { items: [], loading: true };
        const expectedState = { items: [], loading: false };
        const nextState = boardsReducer(state, action);

        assert.deepEqual(nextState, expectedState);
    });
});
