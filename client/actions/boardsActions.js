import { BOARDS } from '../constants/actionTypes';

export function create(title) {
    return {
        type: BOARDS.CREATE,
        payload: {
            title
        }
    };
};

export function remove(id) {
    return {
        type: BOARDS.REMOVE,
        payload: {
            id
        }
    };
};
