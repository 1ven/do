import _ from 'lodash';
import { assert } from 'chai';
import { takeEvery, delay } from 'redux-saga';
import { fork, take, call, put, select } from 'redux-saga/effects';
import api from 'client/services/api';
import types from 'client/constants/actionTypes';
import {
  removeWithDelay,
  createNotificationTask,
  createFromAction,
  watchCreate,
  watchNotifications,
} from 'client/sagas/notificationsSaga';

describe('notificationsSaga', () => {
  describe('removeWithDelay', () => {
    it('remove notification after delay', () => {
      const id = 1;
      const timeout = 3000;
      const gen = removeWithDelay(id, timeout);

      assert.deepEqual(
        gen.next().value,
        call(delay, timeout)
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.NOTIFICATIONS_REMOVE,
          payload: {
            id
          },
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('createFromAction', () => {
    it('should create notification when action has `payload.notification` property', () => {
      const action = {
        type: 'TEST',
        payload: {
          notification: {
            message: 'test',
            type: 'info',
          },
        },
      };
      const { message, type } = action.payload.notification;
      const gen = createFromAction(action);

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.NOTIFICATIONS_CREATE,
          payload: {
            text: message,
            timeout: 5000,
            type,
          },
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('watch tasks', () => {
    it('should watch every NOTIFICATIONS_CREATE action', () => {
      assert.deepEqual(
        watchCreate().next().value,
        takeEvery(types.NOTIFICATIONS_CREATE, createNotificationTask).next().value
      );
    });

    it('should watch every action', () => {
      assert.deepEqual(
        watchNotifications().next().value,
        takeEvery('*', createFromAction).next().value
      );
    });
  });
});
