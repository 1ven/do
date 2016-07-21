import { assert } from 'chai';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import types from 'client/constants/actionTypes';
import api from 'client/services/api';
import { searchTask, watchSearch } from 'client/sagas/searchSaga';

describe('searchSaga', () => {
  describe('searchTask', () => {
    const requestAction = {
      type: types.SEARCH_REQUEST,
      payload: {
        query: 'test',
      },
    };

    it('should not fail', () => {
      const response = {
        result: [{
          id: '1',
          link: '/boards/1',
          content: 'test',
          type: 'cards',
        }],
      };
      const gen = searchTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.search, requestAction.payload.query)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.SEARCH_SUCCESS,
          payload: response,
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('should fail', () => {
      const error = new Error('test');
      const gen = searchTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.search, requestAction.payload.query)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.SEARCH_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('watch tasks', () => {
    it('should watch every SEARCH_REQUEST action', () => {
      assert.deepEqual(
        watchSearch().next().value,
        takeEvery(types.SEARCH_REQUEST, searchTask).next().value
      );
    });
  });
});
