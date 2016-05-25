const sanitize = require('../utils/sanitize');
const Card = require('../models/Card');

exports.update = function (req, res, next) {
    const id = req.params.id;
    const props = sanitize(req.body);

    return Card.update(id, props)
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

exports.findComments = function (req, res, next) {
    const cardId = req.params.id;

    return Card.findComments(cardId)
        .then(comments => {
            res.status(200).json({ result: comments });
        }, next);
};

exports.createComment = function (req, res, next) {
    const userId = req.user.id;
    const cardId = req.params.id;
    const commentData = req.body;

    return Card.createComment(userId, cardId, commentData)
        .then(comment => {
            res.status(201).json({ result: comment });
        }, next);
};
