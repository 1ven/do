import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import deepFreeze from 'deep-freeze';
import notifications from 'client/reducers/notifications';

describe('notifications reducer', () => {
  it('should return inital state', () => {
    assert.deepEqual(notifications(undefined, {}), []);
  });

  it('should handle NOTIFICATIONS_CREATE_WITH_ID action', () => {
    const prevState = [];

    deepFreeze(prevState);

    const action = {
      type: types.NOTIFICATIONS_CREATE_WITH_ID,
      payload: {
        id: 1,
        text: 'test',
        type: 'error',
      },
    };
    assert.deepEqual(notifications(prevState, action), [{
      id: 1,
      text: 'test',
      type: 'error',
    }]);
  });

  it('should handle NOTIFICATIONS_CREATE_WITH_ID action and set `type = info` by default', () => {
    const prevState = [];

    deepFreeze(prevState);

    const action = {
      type: types.NOTIFICATIONS_CREATE_WITH_ID,
      payload: {
        id: 1,
        text: 'test',
      },
    };
    assert.deepEqual(notifications(prevState, action), [{
      id: 1,
      text: 'test',
      type: 'info',
    }]);
  });

  it('should handle NOTIFICATIONS_REMOVE action', () => {
    const prevState = [{
      id: 1,
      text: 'test',
      type: 'info',
    }];

    deepFreeze(prevState);

    const action = {
      type: types.NOTIFICATIONS_REMOVE,
      payload: {
        id: 1,
      },
    };
    assert.deepEqual(notifications(prevState, action), []);
  });
});
