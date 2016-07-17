import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import activity from 'client/reducers/activity';

describe('activity reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(activity(undefined, {}), {
      isFetching: false,
      lastUpdated: undefined,
    });
  });

  it('should handle ACTIVITY_FETCH_REQUEST action', () => {
    const prevState = {
      isFetching: false,
      lastUpdated: 1,
    };
    const action = {
      type: types.ACTIVITY_FETCH_REQUEST,
    };
    assert.deepEqual(activity(prevState, action), {
      isFetching: true,
      lastUpdated: 1,
    });
  });

  it('should handle ACTIVITY_FETCH_SUCCESS action', () => {
    const prevState = {
      isFetching: true,
      lastUpdated: 1,
    };
    const action = {
      type: types.ACTIVITY_FETCH_SUCCESS,
      payload: {
        receivedAt: 2,
      },
    };
    assert.deepEqual(activity(prevState, action), {
      isFetching: false,
      lastUpdated: 2,
    });
  });

  it('should handle ACTIVITY_FETCH_FAILURE action', () => {
    const prevState = {
      isFetching: true,
      lastUpdated: 1,
    };
    const action = {
      type: types.ACTIVITY_FETCH_FAILURE,
    };
    assert.deepEqual(activity(prevState, action), {
      isFetching: false,
      lastUpdated: 1,
    });
  });
});
