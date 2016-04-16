'use strict';

const _ = require('lodash');
const List = require('../models/List');
const BaseController = require('./BaseController');

const ListController = _.assign({}, BaseController, {
    Model: List,

    createCard(req, res, next) {
        const listId = parseInt(req.params.id);
        const text = req.body.text;

        List.createCard(listId, { text })
            .then(list => res.status(201).json({ result: list }), next);
    },
});

module.exports = ListController;
