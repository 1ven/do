import api from '../services/api';
import types from '../constants/actionTypes';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects'
import { fetchUser } from '../actions/userActions';

function* fetchUserTask() {
  try {
    const payload = yield call(api.fetchUser);
    yield put(fetchUser.success(payload));
  } catch(err) {
    yield put(fetchUser.failure(err.message));
  }
}

function* watchFetchUser() {
  yield* takeEvery(types.USER_FETCH_REQUEST, fetchUserTask);
}

export default function* userSaga() {
  yield [
    watchFetchUser(),
  ];
}
