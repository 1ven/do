import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import { startProgressBar, stopProgressBar, setProgressBarValue } from 'client/actions/progressBarActions';

describe('progressbar actions', () => {
  it('should create PROGRESSBAR_START action', () => {
    assert.deepEqual(startProgressBar(), {
      type: types.PROGRESSBAR_START,
    });
  });

  it('should create PROGRESSBAR_STOP action', () => {
    assert.deepEqual(stopProgressBar(), {
      type: types.PROGRESSBAR_STOP,
    });
  });

  it('should create PROGRESSBAR_SET_VALUE action', () => {
    const value = 30;
    assert.deepEqual(setProgressBarValue(value), {
      type: types.PROGRESSBAR_SET_VALUE,
      payload: {
        value,
      },
    });
  });
});
