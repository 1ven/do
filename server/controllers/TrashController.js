const Trash = require('../models/Trash');

exports.find = (req, res, next) => {
  const userId = req.user.id;
  const pageIndex = parseInt(req.params.pageIndex);

  return Trash.find(userId, pageIndex)
    .then(result => {
      res.status(200).json({ result });
    }, next);
};

exports.restore = (req, res, next) => {
  const userId = req.user.id;
  const entryId = req.params.entryId;
  const table = req.body.table;

  return Trash.restore(userId, entryId, table)
    .then(result => {
      res.status(200).json({ result });
    }, next);
};
