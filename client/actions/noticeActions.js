import * as types from '../constants/actionTypes';

export function showInfo(message) {
    return showNotice(message, 'info');
};

export function showError(message) {
    return showNotice(message, 'error');
};

export function hideNotice() {
    return {
        type: types.NOTICE_HIDE
    };
};

function showNotice(message, type) {
    return {
        type: types.NOTICE_SHOW,
        payload: {
            message,
            type
        }
    };
};
