const sanitize = require('../utils/sanitize');
const List = require('../models/List');

exports.update = function (req, res, next) {
    const userId = req.user.id;
    const listId = req.params.id;
    const props = sanitize(req.body);

    return List.update(userId, listId, props)
        .then(list => {
            res.status(200).json({ result: list });
        }, next);
};

exports.drop = function (req, res, next) {
    const id = req.params.id;

    return List.drop(id)
        .then(result => {
            res.status(200).json({ result });
        }, next);
};

exports.createCard = function (req, res, next) {
    const userId = req.user.id;
    const listId = req.params.id;
    const cardProps = sanitize(req.body);

    return List.createCard(userId, listId, cardProps)
        .then(card => {
            res.status(201).json({ result: card });
        }, next);
};
