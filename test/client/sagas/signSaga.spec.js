import { assert } from 'chai';
import sinon from 'sinon';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import types from 'client/constants/actionTypes';
import api from 'client/services/api';
import {
  signInTask,
  signUpTask,
  signOutTask,
  watchSignIn,
  watchSignUp,
  watchSignOut,
} from 'client/sagas/signSaga';

describe('signSaga', () => {
  describe('signInTask', () => {
    const requestAction = {
      type: types.SIGN_IN_REQUEST,
      payload: {
        resolve: sinon.spy(),
        reject: sinon.spy(),
        values: {
          username: 'test',
          password: '123456',
        },
      },
    };

    it('should not fail', () => {
      const gen = signInTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.signIn, requestAction.payload.values)
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.SIGN_IN_SUCCESS,
          payload: undefined,
        })
      );

      gen.next();

      assert.isTrue(gen.next().done);

      assert.equal(requestAction.payload.resolve.callCount, 1);
    });

    it('should fail', () => {
      const error = {
        message: 'test',
        result: [{
          name: 'username',
          message: 'Incorrect username',
        }],
      };
      const gen = signInTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.signIn, requestAction.payload.values)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.SIGN_IN_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);

      assert.isTrue(requestAction.payload.reject.calledWith({
        username: 'Incorrect username',
      }));
    });
  });

  describe('signUpTask', () => {
    const requestAction = {
      type: types.SIGN_UP_REQUEST,
      payload: {
        resolve: sinon.spy(),
        reject: sinon.spy(),
        values: {
          username: 'test',
          email: 'test@test.com',
          password: '123456',
          confirmation: '123456',
        },
      },
    };

    it('should not fail', () => {
      const gen = signUpTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.signUp, requestAction.payload.values)
      );

      assert.deepEqual(
        gen.next().value,
        put({
          type: types.SIGN_UP_SUCCESS,
          payload: undefined,
        })
      );

      gen.next();

      assert.isTrue(gen.next().done);

      assert.equal(requestAction.payload.resolve.callCount, 1);
    });

    it('should fail', () => {
      const error = {
        message: 'test',
        result: [{
          name: 'username',
          message: 'Incorrect username',
        }],
      };
      const gen = signUpTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.signUp, requestAction.payload.values)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.SIGN_UP_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);

      assert.isTrue(requestAction.payload.reject.calledWith({
        username: 'Incorrect username',
      }));
    });
  });

  describe('signOutTask', () => {
    const requestAction = {
      type: types.SIGN_OUT_REQUEST,
    };

    it('should not fail', () => {
      const gen = signOutTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.signOut)
      );

      gen.next();
      gen.next();

      assert.isTrue(gen.next().done);
    });

    it('should fail', () => {
      const error = new Error('test');
      const gen = signOutTask(requestAction);

      assert.deepEqual(
        gen.next().value,
        call(api.signOut)
      );

      assert.deepEqual(
        gen.throw(error).value,
        put({
          type: types.SIGN_OUT_FAILURE,
          error: error.message,
        })
      );

      assert.isTrue(gen.next().done);
    });
  });

  describe('watch tasks', () => {
    it('should watch every SIGN_IN_REQUEST action', () => {
      assert.deepEqual(
        watchSignIn().next().value,
        takeEvery(types.SIGN_IN_REQUEST, signInTask).next().value
      );
    });

    it('should watch every SIGN_UP_REQUEST action', () => {
      assert.deepEqual(
        watchSignUp().next().value,
        takeEvery(types.SIGN_UP_REQUEST, signUpTask).next().value
      );
    });

    it('should watch every SIGN_OUT_REQUEST action', () => {
      assert.deepEqual(
        watchSignOut().next().value,
        takeEvery(types.SIGN_OUT_REQUEST, signOutTask).next().value
      );
    });
  });
});
