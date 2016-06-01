import assign from 'lodash/assign';
import mapKeys from 'lodash/mapKeys';
import isPlainObject from 'lodash/isPlainObject';
import { normalize } from 'normalizr';
import { headers } from '../constants/config';
import 'isomorphic-fetch';

const inflect = require('i')();

function callApi(endpoint, request) {
    const hostname = process.env.NODE_ENV === 'test' ? 'http://localhost' : '';

    if (request && request.body) {
        request.body = JSON.stringify(request.body);
    }

    const requestWithHeaders = assign({}, { headers }, request, {
        credentials: 'same-origin'
    });

    return fetch(hostname + endpoint, requestWithHeaders)
        .then(response => response.json().then(body => ({ response, body })))
        .then(({ response, body }) => {
            // may be not throw an error, when response is not ok. Because it's not exception. Instead of, return object with result and ok properties.
            if (!response.ok)  { return Promise.reject(body); } 
            // check if server responded without json(e.x res.sendStatus()), what value body will have, if body will be undefined, accordingly return of this function must be - `return body || {}`

            return camelizeBody(body);
        });
};

export const CALL_API = Symbol();

export default store => next => action => {
    const options = action[CALL_API];

    if (typeof options === 'undefined') {
        return next(action);
    }

    const {
        types,
        endpoint,
        schema,
        request,
        requestPayload
    } = options;

    const [
        requestType,
        successType,
        errorType
    ] = types;

    next({ type: requestType, payload: requestPayload });

    return callApi(endpoint, request)
        .then(json => {
            if (schema) {
                return normalize(json.result, schema);
            }
            return json.result || {};
        })
        .then(
            data => {
                if (!data.entities) {
                    data = { result: data };
                }

                return next({
                    type: successType,
                    payload: assign({}, data, {
                        receivedAt: Date.now()
                    })
                });
            },
            error => next({
                type: errorType,
                payload: {
                    error: true,
                    result: error.result
                }
            })
        );
};

function camelizeBody(body) {
    let { result } = body;

    if (result instanceof Array) {
        result = result.map((item) => {
            if (isPlainObject(item)) {
                return mapKeys(item, (value, key) => {
                    return inflect.camelize(key, false);
                });
            }
            return item;
        });
    } else if (isPlainObject(result)) {
        result = mapKeys(result, (value, key) => {
            return inflect.camelize(key, false);
        });
    }

    return assign({}, body, { result });
};
