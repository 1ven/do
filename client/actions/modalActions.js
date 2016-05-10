import * as types from '../constants/actionTypes';

export function showModal(title, content) {
    return {
        type: types.MODAL_SHOW,
        payload: {
            title,
            content
        }
    };
};

export function hideModal() {
    return {
        type: types.MODAL_HIDE
    };
};
