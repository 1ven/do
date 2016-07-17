import { assert } from 'chai';
import types from 'client/constants/actionTypes';
import {
  createNotification,
  createNotificationWithId,
  removeNotification,
} from 'client/actions/notificationsActions';

describe('notifications actions', () => {
  it('should create NOTIFICATIONS_CREATE action', () => {
    const text = 'test';
    const type = 'info';
    const timeout = 8000;
    assert.deepEqual(createNotification(text, type, timeout), {
      type: types.NOTIFICATIONS_CREATE,
      payload: {
        text,
        type,
        timeout,
      },
    });
  });

  it('should create NOTIFICATIONS_CREATE action with `timeout = 5000` by default', () => {
    const text = 'test';
    const type = 'info';
    assert.deepEqual(createNotification(text, type), {
      type: types.NOTIFICATIONS_CREATE,
      payload: {
        text,
        type,
        timeout: 5000,
      },
    });
  });

  it('should create NOTIFICATIONS_CREATE_WITH_ID action', () => {
    const id = 1;
    const text = 'test';
    const type = 'info';
    assert.deepEqual(createNotificationWithId(id, text, type), {
      type: types.NOTIFICATIONS_CREATE_WITH_ID,
      payload: {
        id,
        text,
        type,
      },
    });
  });

  it('should create NOTIFICATIONS_REMOVE action', () => {
    const id = 1;
    assert.deepEqual(removeNotification(id), {
      type: types.NOTIFICATIONS_REMOVE,
      payload: {
        id,
      },
    });
  });
});
