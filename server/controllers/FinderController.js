const sanitize = require('../utils/sanitize');
const Finder = require('../models/Finder');

exports.find = (req, res, next) => {
  const body = sanitize(req.body);
  return Finder.find(body.query).then(result => {
    res.status(200).json({ result });
  }, next);
};
