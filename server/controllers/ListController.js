const Card = require('../models/Card');
const List = require('../models/List');

exports.update = function (req, res) {
    const body = req.body;
    const listId = req.params.id;
    // TODO: check user input data
    // Instead of using fields property, to set allowed to update fields, use ssacl
    List.update(body, { where: { id: listId } })
        // FIXME: the same as in create
        .then(list => {
            return List.findById(listId);
        })
        .then(list => {
            const result = list.toJSON();
            res.status(200).send({ result });
        });
};

exports.delete = function (req, res) {
    const listId = req.params.id;
    List.drop({ where: { id: listId } })
        .then(() => {
            res.status(200).send({ result: { id: listId } });
        });
};

exports.createCard = function (req, res) {
    const listId = req.params.id;
    const cardData = req.body;

    List.findById(listId)
        .then(list => {
            return list.createCard(cardData);
        })
        .then(card => {
            return Card.findById(card.id);
        })
        .then(card => {
            const result = card.toJSON();
            res.status(201).send({ result });
        });
};
