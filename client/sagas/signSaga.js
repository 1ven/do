import api from '../services/api';
import types from '../constants/actionTypes';
import { browserHistory } from 'react-router';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects'
import { signIn, signUp, signOut } from '../actions/signActions';

export function* signInTask(action) {
  const { values, resolve, reject } = action.payload;
  try {
    yield call(api.signIn, values);
    yield put(signIn.success());
    resolve();
    browserHistory.push('/');
  } catch(err) {
    yield put(signIn.failure(err.message));
    reject(prettyErrors(err.result));
  }
}

export function* signUpTask(action) {
  const { values, resolve, reject } = action.payload;
  try {
    yield call(api.signUp, values);
    yield put(signUp.success());
    resolve();
    browserHistory.push('/');
  } catch(err) {
    yield put(signUp.failure(err.message));
    reject(prettyErrors(err.result));
  }
}

export function* signOutTask() {
  try {
    yield call(api.signOut);
    yield put(signOut.success());
    browserHistory.push('/sign-in');
  } catch(err) {
    yield put(signOut.failure(err.message));
  }
}

function prettyErrors(result) {
  return result ? result.reduce((acc, e) => ({
    ...acc,
    [e.name]: e.message,
  }), {}) : null;
}

export function* watchSignIn() {
  yield* takeEvery(types.SIGN_IN_REQUEST, signInTask);
}

export function* watchSignUp() {
  yield* takeEvery(types.SIGN_UP_REQUEST, signUpTask);
}

export function* watchSignOut() {
  yield* takeEvery(types.SIGN_OUT_REQUEST, signOutTask);
}

export default function* signSaga() {
  yield [
    watchSignIn(),
    watchSignUp(),
    watchSignOut(),
  ];
}
