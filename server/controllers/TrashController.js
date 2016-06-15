const _ = require('lodash');
const inflect = require('i')();
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
  const type = inflect.singularize(table);

  return Trash.restore(entryId, table)
    .then(entry => {
      return Activity.create(userId, entryId, table, 'Restored')
        .then(activity => _.assign({}, {
          [type]: entry
        }, {
          activity,
        }));
    })
    .then(result => {
      res.status(200).json({ result });
    }, next);
};
