const _ = require('lodash');
const sanitize = require('../utils/sanitize');
const Card = require('../models/Card');
const Trash = require('../models/Trash');
const Activity = require('../models/Activity');

exports.create = (req, res, next) => {
  const userId = req.user.id;
  const listId = req.params.id;
  const cardProps = sanitize(req.body);

  return Card.create(listId, cardProps)
    .then(card => {
      return Card.getColors(card.id)
        .then(colors => _.assign({}, card, { colors }));
    })
    .then(card => {
      return Activity.create(userId, card.id, 'cards', 'Created')
        .then(activity => _.assign({}, { card }, { activity }));
    })
    .then(result => {
      res.status(201).json({
        notification: {
          message: 'Card was successfully created',
          type: 'info',
        },
        result,
      });
    }, next);
};

exports.update = (req, res, next) => {
  const userId = req.user.id;
  const cardId = req.params.id;
  const props = sanitize(req.body);

  return Card.update(cardId, props)
    .then(card => {
      return Activity.create(userId, card.id, 'cards', 'Updated')
        .then(activity => _.assign({}, { card }, { activity }));
    })
    .then(result => {
      res.status(200).json({
        notification: {
          message: 'Card was successfully updated',
          type: 'info',
        },
        result,
      });
    }, next);
};

exports.drop = (req, res, next) => {
  const userId = req.user.id;
  const cardId = req.params.id;

  return Card.drop(cardId)
    .then(card => {
      return Activity.create(userId, card.id, 'cards', 'Deleted')
        .then(activity => _.assign({}, { card }, { activity }));
    })
    .then(result => {
      return Trash.findByEntryId(cardId)
        .then(trash_item => _.assign({}, result, { trash_item }));
    })
    .then(result => {
      res.status(200).json({
        notification: {
          message: 'Card was successfully removed',
          type: 'info',
        },
        result,
      });
    }, next);
};

exports.findById = (req, res, next) => {
  const cardId = req.params.id;

  return Card.findById(cardId)
    .then(card => {
      res.status(200).json({ result: card });
    }, next);
};
