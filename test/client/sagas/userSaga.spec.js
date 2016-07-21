import { assert } from 'chai';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import types from 'client/constants/actionTypes';
import api from 'client/services/api';
import { fetchUserTask, watchFetchUser } from 'client/sagas/userSaga';

describe('userSaga', () => {
  describe('fetchUserTask', () => {
    it('should not fail', () => {
      const response = {
        entities: {
          users: {
            '1': {
              id: '1',
              email: 'test@test.com',
              username: 'test',
            },
          },
        },
        result: '1',
      };
      const gen = fetchUserTask();

      assert.deepEqual(
        gen.next().value,
        call(api.fetchUser)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.USER_FETCH_SUCCESS,
          payload: response,
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('should fail', () => {
      const error = new Error('test');
      const gen = fetchUserTask();

      assert.deepEqual(
        gen.next().value,
        call(api.fetchUser)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.USER_FETCH_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('watch tasks', () => {
    it('should watch every USER_FETCH_REQUEST action', () => {
      assert.deepEqual(
        watchFetchUser().next().value,
        takeEvery(types.USER_FETCH_REQUEST, fetchUserTask).next().value
      );
    });
  });
});
