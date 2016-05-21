const sanitize = require('../utils/sanitize');
const List = require('../models/List');

exports.update = function (req, res, next) {
    const id = req.params.id;
    const props = sanitize(req.body);

    return List.update(id, props)
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
    const listId = req.params.id;
    const cardProps = sanitize(req.body);

    return List.createCard(listId, cardProps)
        .then(card => {
            res.status(201).json({ result: card });
        }, next);
};
