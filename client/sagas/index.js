import boardsSaga from './boardsSaga';
import progressBarSaga from './progressBarSaga';
import activitySaga from './activitySaga';
import userSaga from './userSaga';
import searchSaga from './searchSaga';
import listsSaga from './listsSaga';
import cardsSaga from './cardsSaga';
import commentsSaga from './commentsSaga';
import signSaga from './signSaga';
import notificationsSaga from './notificationsSaga';

export default function* rootSaga() {
  yield [
    boardsSaga(),
    listsSaga(),
    cardsSaga(),
    progressBarSaga(),
    activitySaga(),
    userSaga(),
    searchSaga(),
    commentsSaga(),
    signSaga(),
    notificationsSaga(),
  ];
};
