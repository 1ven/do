import api from '../services/api';
import types from '../constants/actionTypes';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects'
import { createCard } from '../actions/cardsActions';
import { incCardsLength } from '../actions/boardsActions';
import { addCardId } from '../actions/listsActions';

function* createCardTask(action) {
  const { boardId, listId, text } = action.payload;
  try {
    const payload = yield call(api.createCard, listId, text);
    yield put(createCard.success(payload));
    yield put(incCardsLength(boardId));
    yield put(addCardId(listId, payload.result.card));
  } catch(err) {
    yield put(createCard.failure(err.message));
  }
}

function* watchCreateCard() {
  yield* takeEvery(types.CARD_CREATE_REQUEST, createCardTask);
}

export default function* cardsSaga() {
  yield [
    watchCreateCard(),
  ];
}
