import { assert } from 'chai';
import * as types from 'client/constants/actionTypes';
import * as modalActions from 'client/actions/modalActions';

describe('modalActions', () => {
    it('should create MODAL_SHOW action with title and content', () => {
        const action = modalActions.showModal('title', 'content');
        assert.deepEqual(action, {
            type: types.MODAL_SHOW,
            payload: {
                title: 'title',
                content: 'content'
            }
        });
    });

    it('should create MODAL_HIDE action', () => {
        const action = modalActions.hideModal();
        assert.deepEqual(action, {
            type: types.MODAL_HIDE
        });
    });
});
