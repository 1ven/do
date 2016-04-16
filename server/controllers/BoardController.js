'use strict';

const _ = require('lodash');
const Board = require('../models/Board');
const BaseController = require('./BaseController');

const BoardController = _.assign({}, BaseController, {
    Model: Board,

    createList(req, res, next) {
        const boardId = parseInt(req.params.id);
        const title = req.body.title;

        Board.createList(boardId, { title })
            .then(list => res.status(201).json({ result: list }), next);
    },
});

module.exports = BoardController;
