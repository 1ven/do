const _ = require('lodash');
const sanitize = require('../utils/sanitize');
const List = require('../models/List');
const Trash = require('../models/Trash');
const Activity = require('../models/Activity');

exports.create = (req, res, next) => {
  const userId = req.user.id;
  const boardId = req.params.id;
  const listProps = sanitize(req.body);

  return List.create(boardId, listProps)
    .then(list => {
      return Activity.create(userId, list.id, 'lists', 'Created')
      .then(activity => {
        return _.assign({}, list, { activity });
      });
    })
    .then(result => {
      res.status(201).json({ result });
    }, next);
};

exports.update = (req, res, next) => {
  const userId = req.user.id;
  const listId = req.params.id;
  const props = sanitize(req.body);

  return List.update(listId, props)
    .then(list => {
      return Activity.create(userId, list.id, 'lists', 'Updated')
        .then(activity => _.assign({}, list, { activity }));
    })
    .then(result => {
      res.status(200).json({ result });
    }, next);
};

exports.drop = (req, res, next) => {
  const userId = req.user.id;
  const listId = req.params.id;

  return List.drop(listId)
    .then(result => {
      return Activity.create(userId, result.id, 'lists', 'Removed')
        .then(activity => _.assign({}, result, { activity }));
    })
    .then(result => {
      return Trash.findByEntryId(listId)
        .then(trash => _.assign({}, result, { trash }));
    })
    .then(result => {
      res.status(200).json({ result });
    }, next);
};
