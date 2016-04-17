import { assert } from 'chai';
import boardsReducer from 'client/reducers/boardsReducer';
import * as types from 'client/constants/actionTypes';

describe('boards reducer', () => {
    it('should return initial state', () => {
        const nextState = boardsReducer(undefined, {});

        assert.deepEqual(nextState, {
            ids: [],
            loading: false
        });
    });

    it('should handle BOARDS_GET_ALL_REQUEST action', () => {
        const action = {
            type: types.BOARDS_GET_ALL_REQUEST
        };
        const prevState = {
            ids: [],
            loading: false
        };
        const nextState = boardsReducer(prevState, action);

        assert.deepEqual(nextState, {
            ids: [],
            loading: true
        });
    });

    it('should handle BOARDS_GET_ALL_ERROR action', () => {
        const action = {
            type: types.BOARDS_GET_ALL_ERROR
        };
        const prevState = {
            ids: [],
            loading: true
        };
        const nextState = boardsReducer(prevState, action);

        assert.deepEqual(nextState, {
            ids: [],
            loading: false
        });
    });

    it('should handle BOARDS_GET_ALL_SUCCESS action', () => {
        const boards = [1, 4, 7];
        const action = {
            type: types.BOARDS_GET_ALL_SUCCESS,
            payload: {
                result: boards
            }
        };
        const prevState = {
            ids: [],
            loading: true
        };
        const nextState = boardsReducer(prevState, action);

        assert.deepEqual(nextState, {
            ids: [1, 4, 7],
            loading: false
        });
    });

    it('should handle BOARDS_CREATE_SUCCESS action', () => {
        const boardId = 4;
        const action = {
            type: types.BOARDS_CREATE_SUCCESS,
            payload: {
                result: boardId
            }
        };
        const prevState = {
            ids: [5, 8],
            loading: false
        };
        const nextState = boardsReducer(prevState, action);

        assert.deepEqual(nextState, {
            ids: [5, 8, 4],
            loading: false
        });
    });
});
