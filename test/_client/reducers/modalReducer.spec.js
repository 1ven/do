import { assert } from 'chai';
import modalReducer from 'client/reducers/modalReducer';
import * as types from 'client/constants/actionTypes';

describe('modalReducer', () => {
    it('should return initial state', () => {
        const nextState = modalReducer(undefined, {});
        assert.deepEqual(nextState, null);
    });

    it('should handle MODAL_SHOW action', () => {
        const action = {
            type: types.MODAL_SHOW,
            payload: {
                title: 'test',
                content: 'test content'
            }
        };
        const nextState = modalReducer(undefined, action);

        assert.deepEqual(nextState, action.payload);
    });

    it('should handle MODAL_HIDE action', () => {
        const action = {
            type: types.MODAL_HIDE
        };
        const prevState = {
            title: 'test',
            content: 'test content'
        };
        const nextState = modalReducer(prevState, action);

        assert.deepEqual(nextState, null);
    });
});
