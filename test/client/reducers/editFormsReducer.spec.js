import { assert } from 'chai';
import * as types from 'client/constants/actionTypes';
import editFormsReducer from 'client/reducers/editFormsReducer';

describe('editFormsReducer', () => {
    it('should return initial state', () => {
        const nextState = editFormsReducer(undefined, {});
        assert.deepEqual(nextState, {
            board: null,
            list: null,
            card: null
        });
    });

    it('should handle EDIT_FORMS_SHOW', () => {
        const prevState = {
            board: null,
            list: null,
            card: null
        };
        const nextState = editFormsReducer(prevState, {
            type: types.EDIT_FORMS_SHOW,
            payload: {
                type: 'board',
                id: 5
            }
        });
        const expectedState = {
            board: 5,
            list: null,
            card: null
        };
        assert.deepEqual(nextState, expectedState);
    });

    it('should handle EDIT_FORMS_HIDE', () => {
        const prevState = {
            board: null,
            list: 3,
            card: null
        };
        const nextState = editFormsReducer(prevState, {
            type: types.EDIT_FORMS_HIDE
        });
        const expectedState = {
            board: null,
            list: null,
            card: null
        };
        assert.deepEqual(nextState, expectedState);
    });
});
