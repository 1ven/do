const User = require('../models/User');

exports.getData = function (req, res, next) {
    const userId = req.user.id;

    User.findById(userId).then(user => {
        res.status(200).json({ result: user });
    }, next);
};
