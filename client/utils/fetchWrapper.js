import fetch from 'isomorphic-fetch';

export default function (url, options) {
    const hostname = process.env.NODE_ENV === 'test' ? 'http://localhost' : '';

    return fetch(hostname + url, options)
        .then(result => result.json())
        .then(json => {
            if (!json.success) {
                throw new Error(json.error || 'Something went wrong');
            }
            return json;
        });
};
