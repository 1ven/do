import api from '../services/api';
import types from '../constants/actionTypes';
import { takeEvery, delay } from 'redux-saga';
import { call, put, take, fork, cancel, select } from 'redux-saga/effects'
import { createNotification, createNotificationWithId, removeNotification } from '../actions/notificationsActions';
import shortId from 'shortid';

function* removeWithDelay(id) {
  yield delay(5000);
  yield put(removeNotification(id));
}

function* createNotificationTask(action) {
  const { text, type } = action.payload;
  const id = shortId.generate();
  yield put(createNotificationWithId(id, text, type));
  const task = yield fork(removeWithDelay, id);

  while (true) {
    const removeAction = yield take(types.NOTIFICATIONS_REMOVE);
    if (removeAction.payload.id === id) {
      yield cancel(task);
    }
  }
}

function* watchCreate() {
  yield* takeEvery(types.NOTIFICATIONS_CREATE, createNotificationTask);
}

export default function* notificationsSaga() {
  yield [
    watchCreate(),
  ];
}
