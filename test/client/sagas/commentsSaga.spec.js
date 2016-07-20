import { assert } from 'chai';
import { takeEvery } from 'redux-saga';
import { take, call, put, select } from 'redux-saga/effects';
import api from 'client/services/api';
import types from 'client/constants/actionTypes';
import {
  createCommentTask,
  removeCommentTask,
  watchCreateComment,
  watchRemoveComment,
} from 'client/sagas/commentsSaga';

describe('commentsSaga', () => {
  describe('createCommentTask', () => {
    const requestAction = {
      type: types.COMMENT_CREATE_REQUEST,
      payload: {
        cardId: '1',
        text: 'test',
      },
    };

    it('should not fail', () => {
      const response = {
        entities: {
          comments: {
            '2': {
              id: '2',
              text: 'test',
            },
          },
        },
        result: '2',
      };
      const { cardId, text } = requestAction.payload;
      const gen = createCommentTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.createComment, cardId, text)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.COMMENT_CREATE_SUCCESS,
          payload: response,
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.CARD_ADD_COMMENT_ID,
          payload: {
            cardId,
            commentId: response.result,
          },
        })
      );

      assert.isTrue(gen.next().done);
    });

    it('should fail', () => {
      const error = new Error('test');
      const { cardId, text } = requestAction.payload;
      const gen = createCommentTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.createComment, cardId, text)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.COMMENT_CREATE_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('removeCommentTask', () => {
    const requestAction = {
      type: types.COMMENT_REMOVE_REQUEST,
      payload: {
        cardId: '1',
        commentId: '2',
      },
    };

    it('should not fail', () => {
      const response = {
        entities: {
          comments: {
            '2': {
              id: '2',
              text: 'test',
            },
          },
        },
        result: '2',
      };
      const { cardId, commentId } = requestAction.payload;
      const gen = removeCommentTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.removeComment, commentId)
      );

      assert.deepEqual(
        gen.next(response).value,
        put({
          type: types.COMMENT_REMOVE_SUCCESS,
          payload: response,
        })
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.CARD_REMOVE_COMMENT_ID,
          payload: {
            cardId,
            commentId: response.result,
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
      const { cardId, commentId } = requestAction.payload;
      const gen = removeCommentTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.removeComment, commentId)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.COMMENT_REMOVE_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('watch tasks', () => {
    it('should watch every COMMENT_CREATE_REQUEST action', () => {
      assert.deepEqual(
        watchCreateComment().next().value,
        takeEvery(types.COMMENT_CREATE_REQUEST, createCommentTask).next().value
      );
    });

    it('should watch every COMMENT_REMOVE_REQUEST action', () => {
      assert.deepEqual(
        watchRemoveComment().next().value,
        takeEvery(types.COMMENT_REMOVE_REQUEST, removeCommentTask).next().value
      );
    });
  });
});
