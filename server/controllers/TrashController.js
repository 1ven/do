const _ = require('lodash');
const Trash = require('../models/Trash');
const Activity = require('../models/Activity');

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

  return Trash.restore(entryId, table)
    .then(entry => {
      return Activity.create(userId, entryId, table, 'Restored')
        .then(activity => _.assign({}, entry, { activity }));
    })
    .then(result => {
      res.status(200).json({ result });
    }, next);
};
