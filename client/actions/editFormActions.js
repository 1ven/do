import * as types from '../constants/actionTypes';

export function hideEditForm() {
  return {
    type: types.EDIT_FORM_HIDE,
  };
};

export function showEditForm(id, type) {
  return {
    type: types.EDIT_FORM_SHOW,
    payload: {
      id,
      type,
    },
  };
};
