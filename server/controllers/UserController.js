const User = require('../models/User');

exports.create = function (req, res) {
    const body = req.body;
    // TODO: check user input data
    User.create(body)
        // FIXME: extra request. may be it can be solved by using ssacl-attribute-roles
        .then(user => {
            return User.findById(user.id);
        })
        .then(user => {
            const result = user.toJSON();
            res.status(201).send({ result });
        });
};

exports.findById = function (req, res) {
    const id = req.params.id;
    User.findById(id).then(user => {
        const result = user.toJSON();
        res.status(200).send({ result });
    });
};
