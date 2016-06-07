const sanitize = require('../utils/sanitize');
const Card = require('../models/Card');

exports.create = (req, res, next) => {
  const userId = req.user.id;
  const listId = req.params.id;
  const cardProps = sanitize(req.body);

  return Card.create(userId, listId, cardProps)
    .then(card => {
      res.status(201).json({ result: card });
    }, next);
};

exports.update = (req, res, next) => {
  const userId = req.user.id;
  const cardId = req.params.id;
  const props = sanitize(req.body);

  return Card.update(userId, cardId, props)
    .then(card => {
      res.status(200).json({ result: card });
    }, next);
};

exports.drop = (req, res, next) => {
  const id = req.params.id;

  return Card.drop(id)
    .then(result => {
      res.status(200).json({ result });
    }, next);
};

exports.findById = (req, res, next) => {
  const cardId = req.params.id;

  return Card.findById(cardId)
    .then(card => {
      res.status(200).json({ result: card });
    }, next);
};
