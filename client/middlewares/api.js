import assign from 'lodash/assign';
import { normalize } from 'normalizr';
import { headers } from '../constants/config';
import 'isomorphic-fetch';

function callApi(endpoint, request) {
    const hostname = process.env.NODE_ENV === 'test' ? 'http://localhost' : '';

    if (request && request.body) {
        request.body = JSON.stringify(request.body);
    }

    const requestWithHeaders = assign({}, { headers }, request);

    return fetch(hostname + endpoint, requestWithHeaders)
        .then(response => response.json().then(body => ({ response, body })))
        .then(({ response, body }) => {
            if (!response.ok)  { Promise.reject(body); } 
            return body;
        });
};

export const CALL_API = Symbol();

export default store => next => action => {
    const options = action[CALL_API];

    if (typeof options === 'undefined') {
        return next(action);
    }

    const { types, endpoint, schema, request } = options;
    const [ requestType, successType, errorType ] = types;

    next({ type: requestType });

    return callApi(endpoint, request)
        .then(json => {
            if (schema) {
                return normalize(json.data, schema);
            }
            return json.data;
        })
        .then(
            data => next({
                type: successType,
                payload: data
            }),
            error => next({
                type: errorType,
                payload: {
                    error: error.message || 'Something bad happened'
                }
            })
        );
};
