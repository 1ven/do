import { assert } from 'chai';
import noticeReducer from 'client/reducers/noticeReducer';
import * as types from 'client/constants/actionTypes';

describe('notice reducer', () => {
    it('should return initial state', () => {
        const nextState = noticeReducer(undefined, {});
        assert.deepEqual(nextState, null);
    });

    it('should handle NOTICE_SHOW action', () => {
        const payload = { type: 'info', message: 'Test message' };
        const action = {
            type: types.NOTICE_SHOW,
            payload 
        };
        const nextState = noticeReducer(null, action);
        assert.deepEqual(nextState, payload);
    });

    it('should handle NOTICE_HIDE action', () => {
        const action = {
            type: types.NOTICE_HIDE
        };
        const prevState = {
            message: 'Test message',
            type: 'info'
        };
        const nextState = noticeReducer(prevState, action);
        assert.deepEqual(nextState, null);
    });

    it('should handle all actions with "payload.error"', () => {
        const message = 'Something gone bad';
        const action = {
            type: 'SOME_ACTION',
            payload: {
                error: message
            }
        };
        const nextState = noticeReducer(null, action);
        assert.deepEqual(nextState, { type: 'error', message });
    });
});
