import api from '../services/api';
import types from '../constants/actionTypes';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects'
import { fetchActivity } from '../actions/activityActions';

function* fetchActivityTask() {
  try {
    const payload = yield call(api.fetchActivity);
    yield put(fetchActivity.success(payload));
  } catch(err) {
    yield put(fetchActivity.failure(err.message));
  }
}

function* watchFetchActivity() {
  yield* takeEvery(types.ACTIVITY_FETCH_REQUEST, fetchActivityTask);
}

export default function* activitySaga() {
  yield [
    watchFetchActivity(),
  ];
}
