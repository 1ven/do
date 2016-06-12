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
        return _.assign({}, { list }, { activity });
      });
    })
    .then(result => {
      res.status(201).json({
        notification: {
          message: 'List was successfully created',
          type: 'info',
        },
        result,
      });
    }, next);
};

exports.update = (req, res, next) => {
  const userId = req.user.id;
  const listId = req.params.id;
  const props = sanitize(req.body);

  return List.update(listId, props)
    .then(list => {
      return Activity.create(userId, list.id, 'lists', 'Updated')
        .then(activity => _.assign({}, { list }, { activity }));
    })
    .then(result => {
      res.status(200).json({
        notification: {
          message: 'List was successfully updated',
          type: 'info',
        },
        result,
      });
    }, next);
};

exports.drop = (req, res, next) => {
  const userId = req.user.id;
  const listId = req.params.id;

  return List.drop(listId)
    .then(list => {
      return Activity.create(userId, listId, 'lists', 'Removed')
        .then(activity => _.assign({}, { list }, { activity }));
    })
    .then(result => {
      return Trash.findByEntryId(listId)
        .then(trash_item => _.assign({}, result, { trash_item }));
    })
    .then(result => {
      res.status(200).json({
        notification: {
          message: 'List was successfully removed',
          type: 'info',
        },
        result,
      });
    }, next);
};
