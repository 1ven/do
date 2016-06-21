import boardsSaga from './boardsSaga';
import progressBarSaga from './progressBarSaga';

export default function* rootSaga() {
  yield [
    boardsSaga(),
    progressBarSaga(),
  ];
};
