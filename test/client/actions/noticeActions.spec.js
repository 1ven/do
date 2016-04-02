import { assert } from 'chai';
import * as types from 'client/constants/actionTypes';
import * as actions from 'client/actions/noticeActions';

describe('noticeActions', () => {
    it('should create NOTICE_SHOW action', () => {
        const message = 'test message';
        const action = actions.showNotice(message);
        const expected = {
            type: types.NOTICE_SHOW,
            payload: {
                message
            }
        };
        assert.deepEqual(action, expected);
    });

    it('should create NOTICE_HIDE action', () => {
        const action = actions.hideNotice();
        const expected = {
            type: types.NOTICE_HIDE
        };
        assert.deepEqual(action, expected);
    });
});
