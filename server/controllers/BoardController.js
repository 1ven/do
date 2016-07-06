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
  const page = req.query.page || 1;
  const itemsPerPage = req.query.itemsPerPage;
  const starred = req.query.starred;

  const offset = itemsPerPage ? itemsPerPage * (page - 1) : 0;

  return Board.findAllByUser(userId, itemsPerPage, offset, starred)
    .then(boards => Board.getBoardsCount(userId).then(count => ({ boards, count })))
    .then(result => {
      const boards = result.boards;
      const count = result.count;

      if (!itemsPerPage || itemsPerPage * page >= count) {
        return { boards };
      }

      return {
        nextPage: + page + 1,
        boards,
      };
    })
    .then(result => {
      res.status(200).json({ result });
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
  const notify = req.query.notify;
  const activity = req.query.activity;

  return Board.update(boardId, props)
    .then(board => {
      if (activity === 'false') {
        return { board };
      }
      return Activity.create(userId, boardId, 'boards', 'Updated')
        .then(activity => _.assign({}, { board }, { activity }));
    })
    .then(result => {
      if (notify === 'false') {
        return { result };
      }
      return _.assign({}, { result }, {
        notification: {
          message: 'Board was successfully updated',
          type: 'info',
        },
      });
    })
    .then(body => {
      res.status(200).json(body);
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
