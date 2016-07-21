import api from '../services/api';
import types from '../constants/actionTypes';
import { takeEvery, delay } from 'redux-saga';
import { call, put, take, fork, cancel, select } from 'redux-saga/effects'
import { createNotification, createNotificationWithId, removeNotification } from '../actions/notificationsActions';
import shortId from 'shortid';

export function* removeWithDelay(id, timeout) {
  yield delay(timeout);
  yield put(removeNotification(id));
}

export function* createNotificationTask(action) {
  const { text, type, timeout } = action.payload;
  const id = shortId.generate();
  yield put(createNotificationWithId(id, text, type));
  const task = yield fork(removeWithDelay, id, timeout);

  while (true) {
    const removeAction = yield take(types.NOTIFICATIONS_REMOVE);
    if (removeAction.payload.id === id) {
      yield cancel(task);
    }
  }
}

export function* createFromAction(action) {
  if (action && action.payload && action.payload.notification) {
    const { message, type } = action.payload.notification;
    yield put(createNotification(
      message,
      type
    ));
  }
}

export function* watchCreate() {
  yield* takeEvery(types.NOTIFICATIONS_CREATE, createNotificationTask);
}

export function* watchNotifications() {
  yield takeEvery('*', createFromAction);
}

export default function* notificationsSaga() {
  yield [
    watchCreate(),
    watchNotifications(),
  ];
}
