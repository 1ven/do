const _ = require('lodash');
const sanitize = require('../utils/sanitize');
const Card = require('../models/Card');
const Activity = require('../models/Activity');

exports.create = (req, res, next) => {
  const userId = req.user.id;
  const listId = req.params.id;
  const cardProps = sanitize(req.body);

  return Card.create(listId, cardProps)
    .then(card => {
      return Activity.create(userId, card.id, 'cards', 'Created')
        .then(activity => _.assign({}, card, { activity }));
    })
    .then(result => {
      res.status(201).json({ result });
    }, next);
};

exports.update = (req, res, next) => {
  const userId = req.user.id;
  const cardId = req.params.id;
  const props = sanitize(req.body);

  return Card.update(cardId, props)
    .then(card => {
      return Activity.create(userId, card.id, 'cards', 'Updated')
        .then(activity => _.assign({}, card, { activity }));
    })
    .then(result => {
      res.status(200).json({ result });
    }, next);
};

exports.drop = (req, res, next) => {
  const userId = req.user.id;
  const cardId = req.params.id;

  return Card.drop(cardId)
    .then(result => {
      return Activity.create(userId, result.id, 'cards', 'Deleted')
        .then(activity => _.assign({}, result, { activity }));
    })
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
