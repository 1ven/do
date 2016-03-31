import _ from 'lodash';
import * as types from '../constants/actionTypes';

const initialState = {
    loading: false,
    items: []
};

export default function boards(state = initialState, action) {
    const payload = action.payload;

    switch (action.type) {
        case types.BOARDS_GET_REQUEST:
            return _.assign({}, state, {
                loading: true
            });
        case types.BOARDS_GET_SUCCESS:
            return _.assign({}, state, {
                loading: false,
                items: payload
            });
        case types.BOARDS_GET_ERROR:
            return _.assign({}, state, {
                loading: false,
            });
        default:
            return state;
    }
};
