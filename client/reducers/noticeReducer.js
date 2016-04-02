import _ from 'lodash';
import * as types from '../constants/actionTypes';

export default function notice(state = null, action) {
    const payload = action.payload;
    const defaults = {
        message: ''
    };

    switch (action.type) {
        case types.NOTICE_SHOW:
            return _.assign({}, defaults, payload);
        case types.NOTICE_HIDE:
            return null;
        default:
            return state;
    }
};
