import fetch from '../utils/fetchWrapper';
import * as types from '../constants/actionTypes';
import makeActionCreators from '../utils/makeActionCreators';
import { showError } from './noticeActions';

const getActionCreators = makeActionCreators([
    types.BOARDS_GET_REQUEST,
    types.BOARDS_GET_SUCCESS,
    types.BOARDS_GET_ERROR
]);

export function getBoards() {
    return function (dispatch) {
        dispatch(getActionCreators.request());
        return fetch('/boards/get-all')
            .then(body =>
                dispatch(getActionCreators.success(body.data))
            )
            .catch(err => {
                dispatch(showError(err.message));
                dispatch(getActionCreators.error(err.message))
            });
    };
};

const createActionCreators = makeActionCreators([
    types.BOARDS_CREATE_REQUEST,
    types.BOARDS_CREATE_SUCCESS,
    types.BOARDS_CREATE_ERROR
]);

export function createBoard(title) {
    const body = JSON.stringify({ title });
    return function (dispatch) {
        return fetch('/boards/create', { body })
            .then(body =>
                dispatch(createActionCreators.success(body.data))
            )
            .catch(err => {
                dispatch(showError(err.message));
                dispatch(createActionCreators.error(err.message))
            });
    };
};
