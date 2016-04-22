import * as types from '../constants/actionTypes';
import assign from 'lodash/assign';

const initialState = {
    board: null,
    list: null,
    card: null
};

export default function editFormsReducer(state = initialState, action) {
    const payload = action.payload;

    switch (action.type) {
        case types.EDIT_FORMS_SHOW:
            return assign({}, state, {
                [payload.type]: payload.id
            });
        case types.EDIT_FORMS_HIDE:
            return initialState;
        default:
            return state;
    }
};
