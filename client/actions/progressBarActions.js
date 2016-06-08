import * as types from '../constants/actionTypes';

let interval;

export function setProgressBarValue(value) {
  return {
    type: types.PROGRESSBAR_SET_VALUE,
    payload: {
      value,
    },
  };
}

export function startProgressBar() {
  let left = 100;
  clearInterval(interval);
  return function (dispatch) {
    const tick = () => {
      left = left - left * 0.1;
      dispatch(setProgressBarValue(100 - left));
    };
    tick();
    interval = setInterval(tick, 1000);
  };
}

export function finishProgressBar() {
  clearInterval(interval);
  return function (dispatch) {
    dispatch(setProgressBarValue(100));
  };
}
