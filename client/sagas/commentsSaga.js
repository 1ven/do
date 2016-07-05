import api from '../services/api';
import types from '../constants/actionTypes';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects'
import { createComment, removeComment } from '../actions/commentsActions';
import { addCommentId, removeCommentId } from '../actions/cardsActions';
import { hideModal } from '../actions/modalActions';

function* createCommentTask(action) {
  const { cardId, text } = action.payload;
  try {
    const payload = yield call(api.createComment, cardId, text);
    yield put(createComment.success(payload));
    yield put(addCommentId(cardId, payload.result));
  } catch(err) {
    yield put(createComment.failure(err.message));
  }
}

function* removeCommentTask(action) {
  const { cardId, commentId } = action.payload;
  try {
    const payload = yield call(api.removeComment, commentId);
    yield put(removeComment.success(payload));
    yield put(removeCommentId(cardId, commentId));
    yield put(hideModal());
  } catch(err) {
    yield put(removeComment.failure(err.message));
  }
}

function* watchCreateComment() {
  yield* takeEvery(types.COMMENT_CREATE_REQUEST, createCommentTask);
}

function* watchRemoveComment() {
  yield* takeEvery(types.COMMENT_REMOVE_REQUEST, removeCommentTask);
}

export default function* commentsSaga() {
  yield [
    watchCreateComment(),
    watchRemoveComment(),
  ];
}
