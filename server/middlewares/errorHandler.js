'use strict';

module.exports = function (err, req, res, next) {
    const message = process.env.NODE_ENV !== 'production' ? (err.message || err) : undefined;

    let status = 500;

    if (res.headersSent) { return next(err); }

    if (err && err.code == 0) {
        status = 404;
    }

    res.status(status).json({ message });
};
