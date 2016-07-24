import { assert } from 'chai';
import { takeEvery } from 'redux-saga';
import { take, call, put, select } from 'redux-saga/effects';
import api from 'client/services/api';
import types from 'client/constants/actionTypes';
import { getCardsLength } from 'client/selectors/cardsSelectors';
import {
  createListTask,
  removeListTask,
  updateListTask,
  watchCreateList,
  watchRemoveList,
  watchUpdateList,
} from 'client/sagas/listsSaga';

describe('listsSaga', () => {
  describe('createListTask', () => {
    const requestAction = {
      type: types.LIST_CREATE_REQUEST,
      payload: {
        boardId: '1',
        title: 'test',
      },
    };

    it('should not fail', () => {
      const response = {
        entities: {
          lists: {
            '2': {
              id: '2',
              title: 'test',
            },
          },
        },
        result: {
          list: '2',
        },
      };
      const { boardId, title } = requestAction.payload;
      const gen = createListTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.createList, boardId, title)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.LIST_CREATE_SUCCESS,
          payload: response,
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.BOARD_ADD_LIST_ID,
          payload: {
            boardId,
            listId: response.result.list,
          },
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.BOARD_INC_LISTS_LENGTH,
          payload: {
            boardId,
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
      const { boardId, title } = requestAction.payload;
      const gen = createListTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.createList, boardId, title)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.LIST_CREATE_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('removeListTask', () => {
    const requestAction = {
      type: types.LIST_REMOVE_REQUEST,
      payload: {
        boardId: '1',
        listId: '2',
      },
    };

    it('should not fail', () => {
      const response = {
        entities: {
          lists: {
            '2': {
              id: '2',
              title: 'test',
            },
          },
        },
        result: {
          list: '2',
        },
      };
      const { boardId, listId } = requestAction.payload;
      const cardsLength = 1;
      const gen = removeListTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.removeList, listId)
      );

      assert.deepEqual(
        gen.next(response).value,
        select(getCardsLength, { listId })
      );

      assert.deepEqual(
        gen.next(cardsLength).value,
        put({
          type: types.LIST_REMOVE_SUCCESS,
          payload: response,
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.BOARD_REMOVE_LIST_ID,
          payload: {
            boardId,
            listId,
          },
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.BOARD_DEC_LISTS_LENGTH,
          payload: {
            boardId,
          },
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.BOARD_DEC_CARDS_LENGTH,
          payload: {
            boardId,
            count: cardsLength,
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
      const { boardId, listId } = requestAction.payload;
      const gen = removeListTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.removeList, listId)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.LIST_REMOVE_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('updateListTask', () => {
    const requestAction = {
      type: types.LIST_UPDATE_REQUEST,
      payload: {
        id: '1',
        props: {
          title: 'test',
        },
      },
    };

    it('should not fail', () => {
      const response = {
        entities: {
          lists: {
            '1': {
              id: '1',
              title: 'test',
            },
          },
        },
        result: {
          list: '1',
        },
      };
      const { id, props } = requestAction.payload;
      const gen = updateListTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.updateList, id, props)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.LIST_UPDATE_SUCCESS,
          payload: response,
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
      const { id, props } = requestAction.payload;
      const gen = updateListTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.updateList, id, props)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.LIST_UPDATE_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('watch tasks', () => {
    it('should watch every LIST_CREATE_REQUEST action', () => {
      assert.deepEqual(
        watchCreateList().next().value,
        takeEvery(types.LIST_CREATE_REQUEST, createListTask).next().value
      );
    });

    it('should watch every LIST_REMOVE_REQUEST action', () => {
      assert.deepEqual(
        watchRemoveList().next().value,
        takeEvery(types.LIST_REMOVE_REQUEST, removeListTask).next().value
      );
    });

    it('should watch every LIST_UPDATE_REQUEST action', () => {
      assert.deepEqual(
        watchUpdateList().next().value,
        takeEvery(types.LIST_UPDATE_REQUEST, updateListTask).next().value
      );
    });
  });
});
