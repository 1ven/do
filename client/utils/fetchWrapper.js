import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import { headers } from '../constants/config';

export default function (url, options) {
    const hostname = process.env.NODE_ENV === 'test' ? 'http://localhost' : '';
    const defaultOptions = {
        method: 'post',
        headers
    };

    return fetch(hostname + url, _.assign({}, defaultOptions, options))
        .then(result => result.json())
        .then(body => {
            if (!body.success) {
                throw new Error(body.error || 'Something went wrong');
            }
            return body;
        });
};
