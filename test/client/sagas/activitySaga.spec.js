import { assert } from 'chai';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import api from 'client/services/api';
import types from 'client/constants/actionTypes';
import { fetchActivityTask, watchFetchActivity } from 'client/sagas/activitySaga';

describe('activitySaga', () => {
  describe('fetchActivityTask', () => {
    it('should not fail', () => {
      const payload = {};
      const gen = fetchActivityTask();

      assert.deepEqual(
        gen.next().value,
        call(api.fetchActivity)
      );

      assert.deepEqual(
        gen.next(payload).value,
        put({
          type: types.ACTIVITY_FETCH_SUCCESS,
          payload,
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('should fail', () => {
      const error = new Error('test');
      const gen = fetchActivityTask();

      assert.deepEqual(
        gen.next().value,
        call(api.fetchActivity)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.ACTIVITY_FETCH_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('watch tasks', () => {
    it('should watch every ACTIVITY_FETCH_REQUEST action', () => {
      assert.deepEqual(
        watchFetchActivity().next().value,
        takeEvery(types.ACTIVITY_FETCH_REQUEST, fetchActivityTask).next().value
      );
    });
  });
});
