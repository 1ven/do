import * as types from '../constants/actionTypes';

export function showNotice(message) {
    return {
        type: types.NOTICE_SHOW,
        payload: {
            message
        }
    };
};

export function hideNotice() {
    return {
        type: types.NOTICE_HIDE
    };
};
