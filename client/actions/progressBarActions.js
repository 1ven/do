import types from '../constants/actionTypes';

export function startProgressBar() {
  return {
    type: types.PROGRESSBAR_START,
  };
}

export function stopProgressBar() {
  return {
    type: types.PROGRESSBAR_STOP,
  };
}

export function setProgressBarValue(value) {
  return {
    type: types.PROGRESSBAR_SET_VALUE,
    payload: {
      value,
    },
  };
}
