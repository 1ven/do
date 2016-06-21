import { call, put, take, cancel, fork, cancelled } from 'redux-saga/effects'
import { delay } from 'redux-saga';
import types from '../constants/actionTypes';
import { setProgressBarValue } from '../actions/progressBarActions';

function* startProgressBarTask() {
  try {
    let left = 100;

    while (true) {
      left = left - left * 0.1;
      yield put(setProgressBarValue(100 - left));
      yield delay(1000);
    }
  } finally {
    if (yield cancelled()) {
      yield put(setProgressBarValue(100));
    }
  }
}

function* watch() {
  while (yield take(types.PROGRESSBAR_START)) {
    const task = yield fork(startProgressBarTask);
    yield take(types.PROGRESSBAR_STOP);
    yield cancel(task);
  }
}

export default function* progressBarSaga() {
  yield [
    watch(),
  ];
}
