import sinon from 'sinon';
import identity from 'lodash/identity';
import { assert } from 'chai';
import { takeEvery } from 'redux-saga';
import { take, call, put, select } from 'redux-saga/effects';
import api from 'client/services/api';
import types from 'client/constants/actionTypes';
import {
  createCardTask,
  removeCardTask,
  fetchCardTask,
  updateCardTask,
  addColorTask,
  removeColorTask,
  moveCardTask,
  watchCreateCard,
  watchRemoveCard,
  watchFetchCard,
  watchUpdateCard,
  watchAddColor,
  watchRemoveColor,
} from 'client/sagas/cardsSaga';

describe('boardsSaga', () => {
  describe('createCardTask', () => {
    const requestAction = {
      type: types.CARD_CREATE_REQUEST,
      payload: {
        boardId: '1',
        listId: '2',
        text: 'test',
      },
    };

    it('should not fail', () => {
      const response = {
        entities: {
          cards: {
            '1': {
              id: '1',
              text: 'test',
            },
          },
        },
        result: {
          card: '1',
        },
      };
      const { boardId, listId, text } = requestAction.payload;
      const gen = createCardTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.createCard, listId, text)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.CARD_CREATE_SUCCESS,
          payload: response,
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.BOARD_INC_CARDS_LENGTH,
          payload: {
            boardId,
          },
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.LIST_ADD_CARD_ID,
          payload: {
            cardId: response.result.card,
            listId,
          },
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.MODAL_HIDE,
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('should fail', () => {
      const error = new Error('test');
      const { boardId, listId, text } = requestAction.payload;
      const gen = createCardTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.createCard, listId, text)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.CARD_CREATE_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('removeCardTask', () => {
    const requestAction = {
      type: types.CARD_REMOVE_REQUEST,
      payload: {
        boardId: '1',
        listId: '2',
        cardId: '3',
      },
    };

    it('should not fail', () => {
      const response = {
        entities: {
          cards: {
            '1': {
              id: '1',
              text: 'test',
            },
          },
        },
        result: {
          card: '1',
        },
      };
      const { boardId, listId, cardId } = requestAction.payload;
      const gen = removeCardTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.removeCard, cardId)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.CARD_REMOVE_SUCCESS,
          payload: response,
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.BOARD_DEC_CARDS_LENGTH,
          payload: {
            boardId,
            count: 1,
          },
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.LIST_REMOVE_CARD_ID,
          payload: {
            listId,
            cardId,
          },
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.MODAL_HIDE,
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('shoul fail', () => {
      const error = new Error('test');
      const { boardId, listId, cardId } = requestAction.payload;
      const gen = removeCardTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.removeCard, cardId)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.CARD_REMOVE_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('fetchCardTask', () => {
    const requestAction = {
      type: types.CARD_FETCH_REQUEST,
      payload: {
        cardId: '1',
      },
    };

    it('should not fail', () => {
      const response = {
        entities: {
          cards: {
            '1': {
              id: '1',
              text: 'test',
            },
          },
        },
        result: '1',
      };
      const gen = fetchCardTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.fetchCard, requestAction.payload.cardId)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.CARD_FETCH_SUCCESS,
          payload: {
            ...response,
            request: requestAction.payload,
          },
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('should fail', () => {
      const error = new Error('test');
      const gen = fetchCardTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.fetchCard, requestAction.payload.cardId)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.CARD_FETCH_FAILURE,
          error: {
            message: error.message,
            request: requestAction.payload,
          },
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('updateCardTask', () => {
    const requestAction = {
      type: types.CARD_UPDATE_REQUEST,
      payload: {
        id: '1',
        props: {
          text: 'test',
        },
      },
    };

    it('should not fail', () => {
      const response = {
        entities: {
          cards: {
            '1': {
              id: '1',
              text: 'test',
            },
          },
        },
        result: {
          card: '1',
        },
      };
      const { id, props } = requestAction.payload;
      const gen = updateCardTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.updateCard, id, props)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.CARD_UPDATE_SUCCESS,
          payload: response,
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('should fail', () => {
      const error = new Error('test');
      const { id, props } = requestAction.payload;
      const gen = updateCardTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.updateCard, id, props)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.CARD_UPDATE_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('addColorTask', () => {
    const requestAction = {
      type: types.CARD_ADD_COLOR_REQUEST,
      payload: {
        cardId: '1',
        colorId: '2',
      },
    };

    it('should not fail', () => {
      const response = {
        entities: {
          cards: {
            '1': {
              id: '1',
              text: 'test',
            },
          },
        },
        result: '1',
      };
      const { cardId, colorId } = requestAction.payload;
      const gen = addColorTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.addColorToCard, cardId, colorId)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.CARD_ADD_COLOR_SUCCESS,
          payload: response,
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('should fail', () => {
      const error = new Error('test');
      const { cardId, colorId } = requestAction.payload;
      const gen = addColorTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.addColorToCard, cardId, colorId)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.CARD_ADD_COLOR_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('removeColorTask', () => {
    const requestAction = {
      type: types.CARD_REMOVE_COLOR_REQUEST,
      payload: {
        cardId: '1',
        colorId: '2',
      },
    };

    it('should not fail', () => {
      const response = {
        entities: {
          cards: {
            '1': {
              id: '1',
              text: 'test',
            },
          },
        },
        result: '1',
      };
      const { cardId, colorId } = requestAction.payload;
      const gen = removeColorTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.removeColorFromCard, cardId, colorId)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.CARD_REMOVE_COLOR_SUCCESS,
          payload: response,
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('should fail', () => {
      const error = new Error('test');
      const { cardId, colorId } = requestAction.payload;
      const gen = removeColorTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.removeColorFromCard, cardId, colorId)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.CARD_REMOVE_COLOR_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('watch tasks', () => {
    it('should watch every CARD_CREATE_REQUEST action', () => {
      assert.deepEqual(
        watchCreateCard().next().value,
        takeEvery(types.CARD_CREATE_REQUEST, createCardTask).next().value
      );
    });

    it('should watch every CARD_REMOVE_REQUEST action', () => {
      assert.deepEqual(
        watchRemoveCard().next().value,
        takeEvery(types.CARD_REMOVE_REQUEST, removeCardTask).next().value
      );
    });

    it('should watch every CARD_FETCH_REQUEST action', () => {
      assert.deepEqual(
        watchFetchCard().next().value,
        takeEvery(types.CARD_FETCH_REQUEST, fetchCardTask).next().value
      );
    });

    it('should watch every CARD_UPDATE_REQUEST action', () => {
      assert.deepEqual(
        watchUpdateCard().next().value,
        takeEvery(types.CARD_UPDATE_REQUEST, updateCardTask).next().value
      );
    });

    it('should watch every CARD_ADD_COLOR_REQUEST action', () => {
      assert.deepEqual(
        watchAddColor().next().value,
        takeEvery(types.CARD_ADD_COLOR_REQUEST, addColorTask).next().value
      );
    });

    it('should watch every CARD_REMOVE_COLOR_REQUEST action', () => {
      assert.deepEqual(
        watchRemoveColor().next().value,
        takeEvery(types.CARD_REMOVE_COLOR_REQUEST, removeColorTask).next().value
      );
    });
  });
});
