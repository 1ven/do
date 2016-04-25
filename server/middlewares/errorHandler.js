'use strict';

const _ = require('lodash');

module.exports = function (err, req, res, next) {
    let message = process.env.NODE_ENV !== 'production' ? err.message : undefined;

    let status = 500;
    let result;

    if (res.headersSent) {
        return next(err);
    }

    if (!err) {
        return res.status(status).json();
    }

    if (err.code == 0) {
        status = 404;
    }

    if (err.validation) {
        result = err.validation;
        status = 400;
        message = undefined;
    }

    res.status(status).json(_.merge({}, { message, result }));
};
