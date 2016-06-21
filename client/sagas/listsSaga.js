import api from '../services/api';
import types from '../constants/actionTypes';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects'
import { createList, removeList } from '../actions/listsActions';
import { addListId, removeListId } from '../actions/boardsActions';

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

function* removeListTask(action) {
  try {
    const { boardId, listId } = action.payload;
    const payload = yield call(api.removeList, listId);
    yield put(removeList.success(payload));
    yield put(removeListId(boardId, listId));
  } catch(err) {
    yield put(removeList.failure(err.message));
  }
}

function* watchCreateList() {
  yield* takeEvery(types.LIST_CREATE_REQUEST, createListTask);
}

function* watchRemoveList() {
  yield* takeEvery(types.LIST_REMOVE_REQUEST, removeListTask);
}

export default function* listsSaga() {
  yield [
    watchCreateList(),
    watchRemoveList(),
  ];
}
