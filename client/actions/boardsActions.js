import fetch from '../utils/fetchWrapper';
import * as types from '../constants/actionTypes';
import makeActionCreators from '../utils/makeActionCreators';

const getActionCreators = makeActionCreators([
    types.BOARDS_GET_REQUEST,
    types.BOARDS_GET_SUCCESS,
    types.BOARDS_GET_ERROR
]);

export function getBoards() {
    return function (dispatch) {
        dispatch(getActionCreators.request());
        return fetch('/boards/get-all', { method: 'post' })
            .then(body =>
                dispatch(getActionCreators.success(body.data))
            )
            .catch(err =>
                dispatch(getActionCreators.error(err.message))
            );
    };
};
