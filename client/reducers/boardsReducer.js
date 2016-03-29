import _ from 'lodash';
import { BOARDS } from '../constants/actionTypes';

const initialState = {
    loading: false,
    items: []
};

export default function boards(state = initialState, action) {
    const payload = action.payload;

    switch (action.type) {
        case types.BOARDS_GET_START:
            return _.assign({}, state, {
                loading: true
            });
        case types.BOARDS_GET_SUCCESS:
            return _.assign({}, state, {
                loading: false,
                items: payload.boards
            });
        // case BOARDS.REMOVE:
        //     return _.filter(state, board => {
        //         return board.id !== payload.id;
        //     });
        default:
            return state;
    }
};
