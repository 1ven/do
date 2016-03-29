import rp from 'request-promise';

export default function (uri, body) {
    return rp({ method: 'POST', json: true, body, uri })
    .then(body => {
        if (body.success) {
            return body.data;
        } else {
            throw new Error(body.error);
        }
    });
};
