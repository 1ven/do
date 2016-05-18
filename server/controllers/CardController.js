const Card = require('../models/Card');

exports.update = function (req, res) {
    const body = req.body;
    const cardId = req.params.id;
    // TODO: check user input data
    // Instead of using fields property, to set allowed to update fields, use ssacl
    Card.update(body, { where: { id: cardId } })
        // FIXME: the same as in create
        .then(card => {
            return Card.findById(cardId);
        })
        .then(card => {
            const result = card.toJSON();
            res.status(200).send({ result });
        });
};

exports.delete = function (req, res) {
    const cardId = req.params.id;
    Card.drop({ where: { id: cardId } })
        .then(() => {
            res.status(200).send({ result: { id: cardId } });
        });
};
