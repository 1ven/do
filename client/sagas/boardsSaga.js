import api from '../services/api';
import types from '../constants/actionTypes';
import { takeEvery } from 'redux-saga';
import { select, take, call, put } from 'redux-saga/effects'
import { fetchBoards, fetchBoard, createBoard, removeBoard, updateBoard, moveBoard } from '../actions/boardsActions';
import { startProgressBar, stopProgressBar } from '../actions/progressBarActions';
import { hideModal } from '../actions/modalActions';

function* fetchBoardsTask(action) {
  const { pageIndex } = action.payload;
  try {
    yield put(startProgressBar());
    const payload = yield call(api.fetchBoards, pageIndex);
    yield put(fetchBoards.success({
      ...payload,
      request: {
        pageIndex,
      },
    }));
  } catch(err) {
    yield put(fetchBoards.failure(err.message));
  } finally {
    yield put(stopProgressBar());
  }
}

function* fetchBoardTask(action) {
  try {
    yield put(startProgressBar());
    const payload = yield call(api.fetchBoard, action.payload.id);
    yield put(fetchBoard.success(payload));
  } catch(err) {
    yield put(fetchBoard.failure(err.message));
  } finally {
    yield put(stopProgressBar());
  }
}

function* createBoardTask(action) {
  const { title, description } = action.payload;
  try {
    const payload = yield call(api.createBoard, title, description);
    yield put(createBoard.success(payload));
    yield put(hideModal());
    action.payload.resolve();
  } catch(err) {
    yield put(createBoard.failure(err.message));
    action.payload.reject();
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

function* updateBoardTask(action) {
  const { id, props, params } = action.payload;
  try {
    const payload = yield call(api.updateBoard, id, props, params);
    yield put(updateBoard.success(payload));
  } catch(err) {
    yield put(updateBoard.failure(err.message));
  }
}

function* updateBoardModalFormTask(action) {
  const { id, props, resolve, reject } = action.payload;
  try {
    const payload = yield call(api.updateBoard, id, props);
    yield put(updateBoard.success(payload));
    yield put(hideModal());
    resolve();
  } catch(err) {
    yield put(updateBoard.failure(err.message));
    reject();
  }
}

function* moveBoardTask(action) {
  const { sourceId, targetId } = action.payload;
  try {
    const payload = yield call(api.moveBoard, sourceId, targetId);
    yield put(moveBoard.success(payload));
  } catch(err) {
    yield put(moveBoard.failure(err.message));
  }
}

function* watchFetchBoards() {
  yield* takeEvery(types.BOARDS_FETCH_REQUEST, fetchBoardsTask);
}

function* watchFetchBoard() {
  yield* takeEvery(types.BOARD_FETCH_REQUEST, fetchBoardTask);
}

function* watchCreateBoard() {
  yield* takeEvery(types.BOARD_CREATE_REQUEST, createBoardTask);
}

function* watchRemoveBoard() {
  yield* takeEvery(types.BOARD_REMOVE_REQUEST, removeBoardTask);
}

function* watchUpdateBoard() {
  yield* takeEvery(types.BOARD_UPDATE_REQUEST, updateBoardTask);
}

function* watchUpdateBoardModalForm() {
  yield* takeEvery(types.BOARD_UPDATE_MODAL_FORM, updateBoardModalFormTask);
}

function* watchMoveBoard() {
  yield* takeEvery(types.BOARD_MOVE_REQUEST, moveBoardTask);
}

function* watchScrollBottom() {
  while (yield take(types.SCROLL_BOTTOM)) {
    const state = yield select(state => state);

    const { pathname } = state.routing.locationBeforeTransitions;
    const { isFetching, pageIndex, isLastPage } = state.pages.main;

    if (pathname === '/' && !isFetching && !isLastPage) {
      yield put(fetchBoards.request({ pageIndex: pageIndex + 1 }));
    }
  }
}

export default function* boardsSaga() {
  yield [
    watchFetchBoards(),
    watchFetchBoard(),
    watchCreateBoard(),
    watchRemoveBoard(),
    watchUpdateBoard(),
    watchMoveBoard(),
    watchUpdateBoardModalForm(),
    watchScrollBottom(),
  ];
}
