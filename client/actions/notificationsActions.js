import * as types from '../constants/actionTypes';

export function createNotification(id, text, type) {
    return {
        type: types.NOTIFICATIONS_CREATE,
        payload: {
            id,
            text,
            type
        }
    };
}

export function removeNotification(id) {
    return {
        type: types.NOTIFICATIONS_REMOVE,
        payload: {
            id
        }
    };
};

export function createNotificationWithTimeout(text, type) {
    return function (dispatch) {
        const id = setTimeout(() => {
            dispatch(removeNotification(id));
        }, 5000);

        dispatch(createNotification(id, text, type));
    };
};
