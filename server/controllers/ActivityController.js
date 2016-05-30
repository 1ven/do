const Activity = require('../models/Activity');

exports.findLast = function (req, res, next) {
    Activity.findLast().then(activity => {
        res.status(200).json({ result: activity });
    }, next);
};
