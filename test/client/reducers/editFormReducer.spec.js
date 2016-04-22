import { assert } from 'chai';
import * as types from 'client/constants/actionTypes';
import editFormReducer from 'client/reducers/editFormReducer';

describe('editFormReducer', () => {
    it('should return initial state', () => {
        const nextState = editFormReducer(undefined, {});
        assert.deepEqual(nextState, {
            type: null,
            id: null
        });
    });

    it('should handle EDIT_FORM_SHOW', () => {
        const prevState = {
            type: null,
            id: null
        };
        const nextState = editFormReducer(prevState, {
            type: types.EDIT_FORM_SHOW,
            payload: {
                type: 'board',
                id: 5
            }
        });
        const expectedState = {
            type: 'board',
            id: 5
        };
        assert.deepEqual(nextState, expectedState);
    });

    it('should handle EDIT_FORM_HIDE', () => {
        const prevState = {
            type: 'list',
            id: 3
        };
        const nextState = editFormReducer(prevState, {
            type: types.EDIT_FORM_HIDE
        });
        const expectedState = {
            type: null,
            id: null
        };
        assert.deepEqual(nextState, expectedState);
    });
});
