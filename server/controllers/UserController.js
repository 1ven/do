const User = require('../models/User');

exports.findAll = function (req, res) {
    User.findAll().then(cards => {
        const result = cards.map(card => card.toJSON());
        res.status(200).send({ result });
    });
};

exports.findById = function (req, res) {
    const id = req.params.id;
    User.findById(id).then(card => {
        const result = card.toJSON();
        res.status(200).send({ result });
    });
};

exports.create = function (req, res) {
    const body = req.body;
    // TODO: check user input data
    User.create(body)
        // FIXME: extra request. may be it can be solved by using ssacl-attribute-roles
        .then(card => {
            return User.findById(card.id);
        })
        .then(card => {
            const result = card.toJSON();
            res.status(201).send({ result });
        });
};

exports.update = function (req, res) {
    const body = req.body;
    const cardId = req.params.id;
    // TODO: check user input data
    // Instead of using fields property, to set allowed to update fields, use ssacl
    User.update(body, { where: { id: cardId } })
        // FIXME: the same as in create
        .then(card => {
            return User.findById(cardId);
        })
        .then(card => {
            const result = card.toJSON();
            res.status(200).send({ result });
        });
};

exports.delete = function (req, res) {
    const cardId = req.params.id;
    User.drop({ where: { id: cardId } })
        .then(() => {
            res.status(200).send({ result: { id: cardId } });
        });
};
