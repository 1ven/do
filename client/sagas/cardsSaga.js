import api from '../services/api';
import types from '../constants/actionTypes';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects'
import { createCard, removeCard } from '../actions/cardsActions';
import { incCardsLength, decCardsLength } from '../actions/boardsActions';
import { addCardId, removeCardId } from '../actions/listsActions';

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

function* removeCardTask(action) {
  const { boardId, listId, cardId } = action.payload;
  try {
    const payload = yield call(api.removeCard, cardId);
    yield put(removeCard.success(payload));
    yield put(decCardsLength(boardId, 1));
    yield put(removeCardId(listId, cardId));
  } catch(err) {
    yield put(removeCard.failure(err.message));
  }
}

function* watchCreateCard() {
  yield* takeEvery(types.CARD_CREATE_REQUEST, createCardTask);
}

function* watchRemoveCard() {
  yield* takeEvery(types.CARD_REMOVE_REQUEST, removeCardTask);
}

export default function* cardsSaga() {
  yield [
    watchCreateCard(),
    watchRemoveCard(),
  ];
}
