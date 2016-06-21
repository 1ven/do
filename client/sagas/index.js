import boardsSaga from './boardsSaga';
import progressBarSaga from './progressBarSaga';
import activitySaga from './activitySaga';

export default function* rootSaga() {
  yield [
    boardsSaga(),
    progressBarSaga(),
    activitySaga(),
  ];
};
