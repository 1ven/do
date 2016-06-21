import api from '../services/api';
import types from '../constants/actionTypes';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects'
import { createList } from '../actions/listsActions';
import { addListId } from '../actions/boardsActions';

function* createListTask(action) {
  const { boardId, title } = action.payload;
  try {
    const payload = yield call(api.createList, boardId, title);
    yield put(createList.success(payload));
    yield put(addListId(boardId, payload.result.list));
  } catch(err) {
    yield put(createList.failure(err.message));
  }
}

function* watchCreateList() {
  yield* takeEvery(types.LIST_CREATE_REQUEST, createListTask);
}

export default function* listsSaga() {
  yield [
    watchCreateList(),
  ];
}
