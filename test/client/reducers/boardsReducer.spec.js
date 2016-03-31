import { assert } from 'chai';
import boardsReducer from 'client/reducers/boardsReducer';
import * as types from 'client/constants/actionTypes';

describe('boards reducer', () => {
    it('should return initial state', () => {
        const state = boardsReducer(undefined, {});
        const expectedState = {
            loading: false,
            items: []
        };
        assert.deepEqual(state, expectedState);
    });

    // it('should handle BOARDS:CREATE', () => {
    //     const createAction = {
    //         type: BOARDS.CREATE,
    //         payload: {
    //             title: 'test title',
    //             id: 7
    //         }
    //     };
    //     const state = boardsReducer([], createAction);
    //     const expectedState = [
    //         {
    //             title: 'test title',
    //             id: 7
    //         }
    //     ];
    //     assert.deepEqual(state, expectedState);
    // });

    // it('should handle BOARDS:REMOVE', () => {
    //     const removeAction = {
    //         type: BOARDS.REMOVE,
    //         payload: {
    //             id: 2
    //         }
    //     };
    //     const previousState = [
    //         {
    //             title: 'test title 1',
    //             id: 1
    //         },
    //         {
    //             title: 'test title 2',
    //             id: 2
    //         }
    //     ];
    //     const state = boardsReducer(previousState, removeAction);
    //     const expectedState = [
    //         {
    //             title: 'test title 1',
    //             id: 1
    //         }
    //     ];
    //     assert.deepEqual(state, expectedState);
    // });
});
