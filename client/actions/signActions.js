import { CALL_API } from '../middlewares/api';
import * as types from '../constants/actionTypes';

export function signIn({ username, password, remember }) {
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
                    password,
                    remember
                }
            }
        }
    };
};

export function signUp(formData) {
    return {
        [CALL_API]: {
            types: [
                types.SIGN_UP_REQUEST,
                types.SIGN_UP_SUCCESS,
                types.SIGN_UP_ERROR
            ],
            endpoint: '/sign-up',
            request: {
                method: 'post',
                body: formData
            }
        }
    };
};
