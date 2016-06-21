import api from '../services/api';
import types from '../constants/actionTypes';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects'
import { fetchBoards } from '../actions/boardsActions';
import { startProgressBar, stopProgressBar } from '../actions/progressBarActions';

function* fetchBoardsTask() {
  // TODO: implement caching
  try {
    yield put(startProgressBar());
    const payload = yield call(api.fetchBoards);
    yield put(fetchBoards.success(payload));
  } catch(err) {
    yield put(fetchBoards.failure(err.message));
  } finally {
    yield put(stopProgressBar());
  }
}

function* watchFetchBoards() {
  yield* takeLatest(types.BOARDS_FETCH_REQUEST, fetchBoardsTask);
}

export default function* boardsSaga() {
  yield [
    watchFetchBoards(),
  ];
}
