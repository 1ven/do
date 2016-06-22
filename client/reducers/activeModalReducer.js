import types from '../constants/actionTypes';

const INITIAL_STATE = {
  name: null,
  data: null,
};

export default function activeModal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.MODAL_SHOW:
      return {
        name: action.payload.name,
        data: action.payload.data,
      };
    case types.MODAL_HIDE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
