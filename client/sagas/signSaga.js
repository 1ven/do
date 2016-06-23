import api from '../services/api';
import types from '../constants/actionTypes';
import { browserHistory } from 'react-router';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects'
import { signIn, signUp, signOut } from '../actions/signActions';

function* signInTask(action) {
  const { formData } = action.payload;
  try {
    yield call(api.signIn, formData);
    yield put(signIn.success());
    browserHistory.push('/');
  } catch(err) {
    yield put(signIn.failure(
      err.message,
      err.result
    ));
  }
}

function* signUpTask(action) {
  const { values, resolve, reject } = action.payload;
  try {
    yield call(api.signUp, values);
    yield put(signUp.success());
    browserHistory.push('/');
    resolve();
  } catch(err) {
    const errors = err.result ? err.result.reduce((acc, e) => ({
      ...acc,
      [e.name]: e.message,
    }), {}) : null;
    yield put(signUp.failure(err.message));
    reject(errors);
  }
}

function* signOutTask() {
  try {
    yield call(api.signOut);
    yield put(signOut.success());
    browserHistory.push('/sign-in');
  } catch(err) {
    yield put(signOut.failure(err.message));
  }
}

function* watchSignIn() {
  yield* takeEvery(types.SIGN_IN_REQUEST, signInTask);
}

function* watchSignUp() {
  yield* takeEvery(types.SIGN_UP_REQUEST, signUpTask);
}

function* watchSignOut() {
  yield* takeEvery(types.SIGN_OUT_REQUEST, signOutTask);
}

export default function* signSaga() {
  yield [
    watchSignIn(),
    watchSignUp(),
    watchSignOut(),
  ];
}
