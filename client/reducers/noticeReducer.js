import * as types from '../constants/actionTypes';

export default function notice(state = null, action) {
    const payload = action.payload;

    if (payload && payload.error) {
        return { type: 'error', message: payload.error };
    }

    switch (action.type) {
        case types.NOTICE_SHOW:
            return payload;
        case types.NOTICE_HIDE:
            return null;
        default:
            return state;
    }
};
