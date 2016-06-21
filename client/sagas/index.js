import boardsSaga from './boardsSaga';
import progressBarSaga from './progressBarSaga';
import activitySaga from './activitySaga';
import userSaga from './userSaga';
import trashSaga from './trashSaga';

export default function* rootSaga() {
  yield [
    boardsSaga(),
    progressBarSaga(),
    activitySaga(),
    userSaga(),
    trashSaga(),
  ];
};
