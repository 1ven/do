import * as types from '../constants/actionTypes';

const initialState = null;

function modalReducer(state = initialState, action) {
    const payload = action.payload;

    switch (action.type) {
        case types.MODAL_SHOW:
            return {
                title: payload.title,
                content: payload.content
            };
        case types.MODAL_HIDE:
            return initialState;
        default:
            return state;
    }
};

export default modalReducer;
