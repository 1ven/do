import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import deepFreeze from 'deep-freeze';
import modal from 'client/reducers/modal';

describe('modal reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(modal(undefined, {}), {
      name: null,
      data: null,
    });
  });

  it('should handle MODAL_SHOW action', () => {
    const prevState = {
      name: null,
      data: null,
    };

    deepFreeze(prevState);

    const action = {
      type: types.MODAL_SHOW,
      payload: {
        name: 'test name',
        data: 'test data',
      },
    };
    assert.deepEqual(modal(prevState, action), {
      name: 'test name',
      data: 'test data',
    });
  });

  it('should handle MODAL_HIDE action', () => {
    const prevState = {
      name: 'test name',
      data: 'test data',
    };

    deepFreeze(prevState);

    const action = {
      type: types.MODAL_HIDE,
    };
    assert.deepEqual(modal(prevState, action), {
      name: null,
      data: null,
    });
  });
});
