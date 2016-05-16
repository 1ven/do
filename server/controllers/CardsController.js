const Card = require('../models/Card');

exports.findAll = function (req, res) {
    Card.findAll().then(cards => {
        const result = cards.map(card => card.toJSON());
        res.status(200).send({ result });
    });
};
