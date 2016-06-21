import api from '../services/api';
import types from '../constants/actionTypes';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects'
import { fetchBoards, createBoard, removeBoard } from '../actions/boardsActions';
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

function* createBoardTask(action) {
  try {
    const payload = yield call(api.createBoard, action.payload.title);
    yield put(createBoard.success(payload));
  } catch(err) {
    yield put(createBoard.failure(err.message));
  }
}

function* removeBoardTask(action) {
  try {
    const payload = yield call(api.removeBoard, action.payload.id);
    yield put(removeBoard.success(payload));
  } catch(err) {
    yield put(removeBoard.failure(err.message)); 
  }
}

function* watchFetchBoards() {
  yield* takeEvery(types.BOARDS_FETCH_REQUEST, fetchBoardsTask);
}

function* watchCreateBoard() {
  yield* takeEvery(types.BOARD_CREATE_REQUEST, createBoardTask);
}

function* watchRemoveBoard() {
  yield* takeEvery(types.BOARD_REMOVE_REQUEST, removeBoardTask);
}

export default function* boardsSaga() {
  yield [
    watchFetchBoards(),
    watchCreateBoard(),
    watchRemoveBoard(),
  ];
}
