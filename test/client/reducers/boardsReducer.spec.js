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

    it('should handle BOARDS_GET_REQUEST action', () => {
        const action = {
            type: types.BOARDS_GET_REQUEST
        };
        const prevState = { items: [], loading: false };
        const nextState = boardsReducer(prevState, action);
        const expectedState = { items: [], loading: true };

        assert.deepEqual(nextState, expectedState);
    });

    it('should handle BOARDS_GET_SUCCESS action', () => {
        const boards = [
            { id: 1, title: 'board 1' },
            { id: 2, title: 'board 2' }
        ];
        const action = {
            type: types.BOARDS_GET_SUCCESS,
            payload: boards
        };
        const prevState = { items: [], loading: true };
        const nextState = boardsReducer(prevState, action);
        const expectedState = { items: boards, loading: false };

        assert.deepEqual(nextState, expectedState);
    });

    it('should handle BOARDS_GET_ERROR action', () => {
        const action = {
            type: types.BOARDS_GET_ERROR,
            payload: new Error('Test error'),
            error: true
        };
        const prevState = { items: [], loading: true };
        const nextState = boardsReducer(prevState, action);
        const expectedState = { items: [], loading: false };

        assert.deepEqual(nextState, expectedState);
    });

    it('should handle BOARDS_CREATE_SUCCESS action', () => {
        const board = {
            id: 5,
            title: 'test board'
        };
        const action = {
            type: types.BOARDS_CREATE_SUCCESS,
            payload: board
        };
        const prevState = { items: [], loading: false };
        const nextState = boardsReducer(prevState, action);
        const expectedState = { items: [{ id: 5, title: 'test board' }], loading: false };

        assert.deepEqual(nextState, expectedState);
    });
});
