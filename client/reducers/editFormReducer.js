import * as types from '../constants/actionTypes';
import assign from 'lodash/assign';

const initialState = {
    type: null,
    id: null
};

export default function editFormReducer(state = initialState, action) {
    const payload = action.payload;

    switch (action.type) {
        case types.EDIT_FORM_SHOW:
            return {
                type: payload.type,
                id: payload.id
            };
        case types.EDIT_FORM_HIDE:
            return initialState;
        default:
            return state;
    }
};
