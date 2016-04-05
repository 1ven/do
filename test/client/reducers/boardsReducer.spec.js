import { assert } from 'chai';
import boardsReducer from 'client/reducers/boardsReducer';
import * as types from 'client/constants/actionTypes';

describe('boards reducer', () => {
    it('should return initial state', () => {
        const nextState = boardsReducer(undefined, {});
        const expectedState = {
            ids: []
        };
        assert.deepEqual(nextState, expectedState);
    });

    it('should handle BOARDS_GET_SUCCESS action', () => {
        const boards = [1, 4, 7];
        const action = {
            type: types.BOARDS_GET_SUCCESS,
            payload: {
                result: boards
            }
        };
        const prevState = { ids: [] };
        const nextState = boardsReducer(prevState, action);
        const expectedState = { ids: [1, 4, 7] };

        assert.deepEqual(nextState, expectedState);
    });

    it('should handle BOARDS_CREATE_SUCCESS action', () => {
        const boardId = 4;
        const action = {
            type: types.BOARDS_CREATE_SUCCESS,
            payload: {
                result: boardId
            }
        };
        const prevState = { ids: [5, 8] };
        const nextState = boardsReducer(prevState, action);
        const expectedState = { ids: [5, 8, 4] };

        assert.deepEqual(nextState, expectedState);
    });
});
