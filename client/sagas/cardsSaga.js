import api from '../services/api';
import types from '../constants/actionTypes';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects'
import { createCard, removeCard, fetchCard, updateCard, addColor, removeColor, moveCard } from '../actions/cardsActions';
import { incCardsLength, decCardsLength } from '../actions/boardsActions';
import { addCardId, removeCardId } from '../actions/listsActions';
import { hideModal } from '../actions/modalActions';

function* createCardTask(action) {
  const { boardId, listId, text } = action.payload;
  try {
    const payload = yield call(api.createCard, listId, text);
    yield put(createCard.success(payload));
    yield put(incCardsLength(boardId));
    yield put(addCardId(listId, payload.result.card));
    yield put(hideModal());
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

function* fetchCardTask(action) {
  try {
    const payload = yield call(api.fetchCard, action.payload.id);
    yield put(fetchCard.success(payload));
  } catch(err) {
    yield put(fetchCard.failure(err.message));
  }
}

function* updateCardTask(action) {
  const { id, props } = action.payload;
  try {
    const payload = yield call(api.updateCard, id, props);
    yield put(updateCard.success(payload));
  } catch(err) {
    yield put(updateCard.failure(err.message));
  }
}

function* addColorTask(action) {
  const { cardId, colorId } = action.payload;
  try {
    const payload = yield call(api.addColorToCard, cardId, colorId);
    yield put(addColor.success(payload));
  } catch(err) {
    yield put(addColor.failure(err.message));
  }
}

function* removeColorTask(action) {
  const { cardId, colorId } = action.payload;
  try {
    const payload = yield call(api.removeColorFromCard, cardId, colorId);
    yield put(removeColor.success(payload));
  } catch(err) {
    yield put(removeColor.failure(err.message));
  }
}

function* moveCardTask(action) {
  const { sourceListId, targetListId } = action.payload;
  const lists = yield select(state => state.entities.lists);

  const sourceList = {
    id: sourceListId,
    cards: lists[sourceListId].cards,
  };
  const targetList = {
    id: targetListId,
    cards: lists[targetListId].cards,
  };

  try {
    yield call(api.moveCard, sourceList, targetList);
    yield put(moveCard.success({ sourceListId, targetListId }));
  } catch(err) {
    yield put(moveCard.failure(err.message));
  }
}

function* watchCreateCard() {
  yield* takeEvery(types.CARD_CREATE_REQUEST, createCardTask);
}

function* watchRemoveCard() {
  yield* takeEvery(types.CARD_REMOVE_REQUEST, removeCardTask);
}

function* watchFetchCard() {
  yield* takeEvery(types.CARD_FETCH_REQUEST, fetchCardTask);
}

function* watchUpdateCard() {
  yield* takeEvery(types.CARD_UPDATE_REQUEST, updateCardTask);
}

function* watchAddColor() {
  yield* takeEvery(types.CARD_ADD_COLOR_REQUEST, addColorTask);
}

function* watchRemoveColor() {
  yield* takeEvery(types.CARD_REMOVE_COLOR_REQUEST, removeColorTask);
}

function* watchMoveCard() {
  yield* takeEvery(types.CARD_MOVE_REQUEST, moveCardTask);
}

export default function* cardsSaga() {
  yield [
    watchCreateCard(),
    watchRemoveCard(),
    watchFetchCard(),
    watchUpdateCard(),
    watchAddColor(),
    watchRemoveColor(),
    watchMoveCard(),
  ];
}
