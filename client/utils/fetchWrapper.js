import fetch from 'isomorphic-fetch';

export default function (url, options) {
    return fetch(url, options)
        .then(result => result.json())
        .then(json => {
            if (!json.success) {
                throw new Error(json.error || 'Something went wrong');
            }
            return json;
        });
};
