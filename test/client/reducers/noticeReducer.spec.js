import { assert } from 'chai';
import noticeReducer from 'client/reducers/noticeReducer';
import * as types from 'client/constants/actionTypes';

describe('boards reducer', () => {
    it('should return initial state', () => {
        const nextState = noticeReducer(undefined, {});
        assert.deepEqual(nextState, null);
    });

    it('should handle NOTICE_SHOW action', () => {
        const message = 'Test message';
        const action = {
            type: types.NOTICE_SHOW,
            payload: {
                message
            }
        };
        const nextState = noticeReducer(null, action);
        assert.deepEqual(nextState, { message });
    });

    it('should handle NOTICE_HIDE action', () => {
        const action = {
            type: types.NOTICE_HIDE
        };
        const prevState = {
            message: 'Test message'
        };
        const nextState = noticeReducer(prevState, action);
        assert.deepEqual(nextState, null);
    });
});
