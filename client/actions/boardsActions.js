import request from '../utils/request';
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
        return request('/boards/get-all')
        .then(boards =>
            dispatch(getActionCreators.success({ boards }))
         )
        .catch(err =>
            dispatch(getActionCreators.error(err.message))
        );
    };
};
