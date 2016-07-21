import api from '../services/api';
import types from '../constants/actionTypes';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects'
import { search } from '../actions/searchActions';

export function* searchTask(action) {
  try {
    const payload = yield call(api.search, action.payload.query);
    yield put(search.success(payload));
  } catch(err) {
    yield put(search.failure(err.message));
  }
}

export function* watchSearch() {
  yield* takeEvery(types.SEARCH_REQUEST, searchTask);
}

export default function* searchSaga() {
  yield [
    watchSearch(),
  ];
}
