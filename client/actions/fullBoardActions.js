import * as types from '../constants/actionTypes';
import fetch from '../utils/fetchWrapper';

function receiveFullBoard(fullBoard) {
    return {
        type: types.FULL_BOARD_GET_SUCCESS,
        payload: fullBoard
    };
};

export function getFullBoard(id) {
    const body = JSON.stringify({ id });

    return function (dispatch) {
        return fetch('/boards/get-full', { body })
            .then(body => dispatch(receiveFullBoard(body.data)));
    };
};
