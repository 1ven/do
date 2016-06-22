import types from '../constants/actionTypes';

export default function activeModal(state = null, action) {
  switch (action.type) {
    case types.MODAL_SHOW:
      return action.payload.name;
    case types.MODAL_HIDE:
      return null;
    default:
      return state;
  }
}
