import fetch from 'isomorphic-fetch'
import * as types from '../constants/actionTypes';
import makeActionCreators from '../utils/makeActionCreators';

const getActionCreators = makeActionCreators([
    types.BOARDS_GET_START,
    types.BOARDS_GET_SUCCESS,
    types.BOARDS_GET_ERROR
]);

export function getBoards() {
    return function (dispatch) {
        dispatch(getActionCreators.start());
        return fetch('/boards/get-all', { method: 'post' })
            .then(result => result.json())
            .then(json =>
                dispatch(getActionCreators.success({ boards: json.data }))
             )
            .catch(err =>
                dispatch(getActionCreators.error(err.message))
            );
    };
};
