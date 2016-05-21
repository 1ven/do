const sanitize = require('../utils/sanitize');
const User = require('../models/User');

exports.create = function (req, res, next) {
    const props = sanitize(req.body);

    return User.create(props)
        .then(user => {
            res.status(201).json({ result: user });
        }, next);
};
