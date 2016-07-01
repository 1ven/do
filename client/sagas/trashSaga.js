import api from '../services/api';
import types from '../constants/actionTypes';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects'
import { fetchTrash, restoreEntry } from '../actions/trashActions';

function* fetchTrashTask(action) {
  try {
    const payload = yield call(api.fetchTrash, action.payload.pageIndex);
    yield put(fetchTrash.success(payload));
  } catch(err) {
    yield put(fetchTrash.failure(err.message));
  }
}

function* restoreEntryTask(action) {
  const { entryId, table } = action.payload;
  try {
    const payload = yield call(api.restoreEntry, entryId, table);
    yield put(restoreEntry.success({
      ...payload,
      request: {
        table,
      },
    }));
  } catch(err) {
    yield put(restoreEntry.failure(err.message));
  }
}

function* watchFetchTrash() {
  yield* takeEvery(types.TRASH_FETCH_REQUEST, fetchTrashTask);
}

function* watchRestoreEntry() {
  yield* takeEvery(types.TRASH_RESTORE_REQUEST, restoreEntryTask);
}

export default function* trashSaga() {
  yield [
    watchFetchTrash(),
    watchRestoreEntry(),
  ];
}
