import boardsSaga from './boardsSaga';
import progressBarSaga from './progressBarSaga';
import activitySaga from './activitySaga';
import userSaga from './userSaga';

export default function* rootSaga() {
  yield [
    boardsSaga(),
    progressBarSaga(),
    activitySaga(),
    userSaga(),
  ];
};
