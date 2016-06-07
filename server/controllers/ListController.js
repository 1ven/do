const sanitize = require('../utils/sanitize');
const List = require('../models/List');

exports.create = (req, res, next) => {
  const userId = req.user.id;
  const boardId = req.params.id;
  const listProps = sanitize(req.body);

  return List.create(userId, boardId, listProps)
    .then(list => {
      res.status(201).json({ result: list });
    }, next);
};

exports.update = (req, res, next) => {
  const userId = req.user.id;
  const listId = req.params.id;
  const props = sanitize(req.body);

  return List.update(userId, listId, props)
    .then(list => {
      res.status(200).json({ result: list });
    }, next);
};

exports.drop = (req, res, next) => {
  const id = req.params.id;

  return List.drop(id)
    .then(result => {
      res.status(200).json({ result });
    }, next);
};
