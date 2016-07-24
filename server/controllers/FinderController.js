const sanitize = require('../utils/sanitize');
const Finder = require('../models/Finder');

exports.find = (req, res, next) => {
  const body = sanitize(req.body);
  const userId = req.user.id;

  return Finder.find(body.query, userId).then(result => {
    res.status(200).json({ result });
  }, next);
};
