import api from '../services/api';
import types from '../constants/actionTypes';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects'
import { createComment } from '../actions/commentsActions';
import { addCommentId } from '../actions/cardsActions';

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

function* watchCreateComment() {
  yield* takeEvery(types.COMMENT_CREATE_REQUEST, createCommentTask);
}

export default function* commentsSaga() {
  yield [
    watchCreateComment(),
  ];
}
