import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import deepFreeze from 'deep-freeze';
import progressBar from 'client/reducers/progressBar';

describe('progressBar reducer', () => {
  it('should return the initial state', () => {
    assert.equal(progressBar(undefined, {}), 0);
  });

  it('should handle PROGRESSBAR_SET_VALUE action', () => {
    const prevState = 5;
    const action = {
      type: types.PROGRESSBAR_SET_VALUE,
      payload: {
        value: 20,
      },
    };
    assert.equal(progressBar(prevState, action), 20);
  });
});
