import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import { showModal, hideModal } from 'client/actions/modalActions';

describe('modal actions', () => {
  it('should create MODAL_SHOW action', () => {
    const name = 'test';
    const data = {
      value: '',
    };
    assert.deepEqual(showModal(name, data), {
      type: types.MODAL_SHOW,
      payload: {
        name,
        data,
      },
    });
  });

  it('should create MODAL_HIDE action', () => {
    assert.deepEqual(hideModal(), {
      type: types.MODAL_HIDE,
    });
  });
});
