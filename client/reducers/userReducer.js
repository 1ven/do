import * as types from '../constants/actionTypes';

function userReducer(state = {
    username: undefined,
    avatar: 'http://placehold.it/38x38',
    role: 'user'
}, action) {
    const { username } = action.payload;

    switch (action.type) {
        case types.USER_GET_SUCCESS:
            return assign({}, state, { username });
        default:
            return state;
    }
};

export default userReducer;
