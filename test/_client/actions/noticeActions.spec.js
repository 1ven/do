import { assert } from 'chai';
import * as types from 'client/constants/actionTypes';
import * as actions from 'client/actions/noticeActions';

const getShowAction = (message, type) => {
    return {
        type: types.NOTICE_SHOW,
        payload: {
            message,
            type
        }
    };
};

const message = 'test message';

describe('noticeActions', () => {
    it('should create NOTICE_SHOW action with info', () => {
        const action = actions.showInfo(message);
        const expected = getShowAction(message, 'info');
        assert.deepEqual(action, expected);
    });

    it('should create NOTICE_SHOW action with error', () => {
        const action = actions.showError(message);
        const expected = getShowAction(message, 'error');
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
