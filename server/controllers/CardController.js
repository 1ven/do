const sanitize = require('../utils/sanitize');
const Card = require('../models/Card');

exports.create = function (req, res, next) {
    const userId = req.user.id;
    const listId = req.params.id;
    const cardProps = sanitize(req.body);

    return Card.create(userId, listId, cardProps)
        .then(card => {
            res.status(201).json({ result: card });
        }, next);
};

exports.update = function (req, res, next) {
    const userId = req.user.id;
    const cardId = req.params.id;
    const props = sanitize(req.body);

    return Card.update(userId, cardId, props)
        .then(card => {
            res.status(200).json({ result: card });
        }, next);
};

exports.drop = function (req, res, next) {
    const id = req.params.id;

    return Card.drop(id)
        .then(result => {
            res.status(200).json({ result });
        }, next);
};

exports.findById = function (req, res, next) {
    const cardId = req.params.id;

    return Card.findById(cardId)
        .then(card => {
            res.status(200).json({ result: card });
        }, next);
};
