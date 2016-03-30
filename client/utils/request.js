import Promise from 'bluebird';
import xhr from 'xhr';

export default function (url, reqBody) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'post',
            json: reqBody,
            responseType: 'json',
            url
        };
        xhr(options, (err, res, resBody) => {
            if (err) { return reject(err); }

            if (!resBody) {
                return reject(new Error('Something went wrong'));
            }

            if (resBody.success) {
                resolve(resBody.data);
            } else {
                reject(resBody.error);
            }

        });
    });
};
