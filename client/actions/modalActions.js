import types from '../constants/actionTypes';

export function showModal(name, data) {
  return {
    type: types.MODAL_SHOW,
    payload: {
      name,
      data,
    },
  };
}

export function hideModal() {
  return {
    type: types.MODAL_HIDE,
  };
}
