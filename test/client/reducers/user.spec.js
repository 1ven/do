import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import deepFreeze from 'deep-freeze';
import user from 'client/reducers/user';

describe('user reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(user(undefined, {}), {
      id: undefined,
      lastUpdated: undefined,
      isFetching: false,
      error: false,
    });
  });

  it('should handle USER_FETCH_REQUEST action', () => {
    const prevState = {
      id: undefined,
      lastUpdated: undefined,
      isFetching: false,
      error: false,
    };

    deepFreeze(prevState);

    const action = {
      type: types.USER_FETCH_REQUEST,
    };
    assert.deepEqual(user(prevState, action), {
      id: undefined,
      lastUpdated: undefined,
      isFetching: true,
      error: false,
    });
  });

  it('should handle USER_FETCH_SUCCESS action', () => {
    const prevState = {
      id: undefined,
      lastUpdated: undefined,
      isFetching: true,
      error: true,
    };

    deepFreeze(prevState);

    const action = {
      type: types.USER_FETCH_SUCCESS,
      payload: {
        result: 1,
        receivedAt: 2,
      },
    };
    assert.deepEqual(user(prevState, action), {
      id: 1,
      lastUpdated: 2,
      isFetching: false,
      error: false,
    });
  });

  it('should handle USER_FETCH_FAILURE action', () => {
    const prevState = {
      id: undefined,
      lastUpdated: undefined,
      isFetching: true,
      error: false,
    };

    deepFreeze(prevState);

    const action = {
      type: types.USER_FETCH_FAILURE,
    };
    assert.deepEqual(user(prevState, action), {
      id: undefined,
      lastUpdated: undefined,
      isFetching: false,
      error: true,
    });
  });
});
