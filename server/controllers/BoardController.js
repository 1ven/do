const _ = require('lodash');
const sanitize = require('../utils/sanitize');
const Board = require('../models/Board');
const Activity = require('../models/Activity');

exports.create = (req, res, next) => {
  const userId = req.user.id;
  const boardProps = sanitize(req.body);

  return Board.create(userId, boardProps)
    .then(board => {
      return Activity.create(userId, board.id, 'boards', 'Created')
        .then(activity => _.assign({}, { board }, { activity }));
    })
    .then(result => {
      res.status(201).json({
        notification: {
          message: 'Board was successfully created',
          type: 'info',
        },
        result,
      });
    }, next);
};

exports.findAllByUser = (req, res, next) => {
  const userId = req.user.id;

  return Board.findAllByUser(userId)
    .then(boards => {
      res.status(200).json({ result: boards });
    }, next);
};

exports.findById = (req, res, next) => {
  const id = req.params.id;

  return Board.findById(id)
    .then(board => {
      res.status(200).json({ result: board });
    }, next);
};

exports.update = (req, res, next) => {
  const userId = req.user.id;
  const boardId = req.params.id;
  const props = sanitize(req.body);
  const activityAction = req.query.activityAction;
  const validate = req.query.validate;

  const promise = validate ? Board.validateAndUpdate(boardId, props) : Board.update(boardId, props);

  return promise
    .then(board => {
      return Activity.create(userId, boardId, 'boards', activityAction || 'Updated')
        .then(activity => _.assign({}, { board }, { activity }));
    })
    .then(result => {
      res.status(200).json({
        notification: {
          message: 'Board was successfully updated',
          type: 'info',
        },
        result,
      });
    }, next);
};

exports.drop = (req, res, next) => {
  const userId = req.user.id;
  const boardId = req.params.id;

  return Board.drop(boardId)
    .then(board => {
      return Activity.create(userId, boardId, 'boards', 'Removed')
        .then(activity => _.assign({}, { board }, { activity }));
    })
    .then(result => {
      res.status(200).json({
        notification: {
          message: 'Board was successfully removed',
          type: 'info',
        },
        result,
      });
    }, next);
};

exports.toggleStarred = (req, res, next) => {
  const userId = req.user.id;
  const boardId = req.params.id;

  return Board.toggleStarred(boardId)
    .then(result => {
      res.status(200).json({ result });
    }, next);
};

exports.move = (req, res, next) => {
  const userId = req.user.id;
  const sourceId = req.body.sourceId;
  const targetId = req.body.targetId;

  return Board.move(sourceId, targetId)
    .then(() => Board.findAllIdsByUser(userId))
    .then(result => {
      res.status(200).json({ result });
    });
};
