import { CALL_API } from '../middlewares/api';
import * as types from '../constants/actionTypes';

export function signIn({ username, password }) {
    return {
        [CALL_API]: {
            types: [
                types.SIGN_IN_REQUEST,
                types.SIGN_IN_SUCCESS,
                types.SIGN_IN_ERROR
            ],
            endpoint: '/auth/sign-in/local',
            request: {
                method: 'post',
                body: {
                    username,
                    password
                }
            }
        }
    };
};
