import { assert } from 'chai';
import { takeEvery, delay } from 'redux-saga';
import { cancel, take, fork, call, put } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import api from 'client/services/api';
import types from 'client/constants/actionTypes';
import { startProgressBarTask, watch } from 'client/sagas/progressBarSaga';

describe('progressBarSaga', () => {
  describe('startProgressBarTask', () => {
    it('should start progress bar', () => {
      const gen = startProgressBarTask();

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.PROGRESSBAR_SET_VALUE,
          payload: {
            value: 10,
          },
        })
      );

      assert.deepEqual(
        gen.next().value,
        call(delay, 1000)
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.PROGRESSBAR_SET_VALUE,
          payload: {
            value: 19,
          },
        })
      );
    });
  });

  describe('watch', () => {
    it('should watch every PROGRESSBAR_START action', () => {
      const gen = watch();

      assert.deepEqual(
        gen.next().value,
        take(types.PROGRESSBAR_START)
      );

      assert.deepEqual(
        gen.next(true).value,
        fork(startProgressBarTask)
      );

      const task = createMockTask(startProgressBarTask);

      assert.deepEqual(
        gen.next(task).value,
        take(types.PROGRESSBAR_STOP)
      );

      assert.deepEqual(
        gen.next().value,
        cancel(task)
      );
    });
  });
});
