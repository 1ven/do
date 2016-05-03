'use strict';

const _ = require('lodash');
const Board = require('../models/Board');
const User = require('../models/User');
const BaseController = require('./BaseController');

const BoardController = _.assign({}, BaseController, {
    Model: Board,

    get(req, res, next) {
        const userId = req.user.id;

        User.getWithChildrenOne({ id: userId })
            .then(user => user.boards)
            .then(boards => res.status(200).json({ result: boards }), next);
    },

    create(req, res, next) {
        const userId = req.user.id;
        const title = req.body.title;

        User.createBoard(userId, { title })
            .then(board => res.status(201).json({ result: board }), next);
    },

    createList(req, res, next) {
        const boardId = parseInt(req.params.id);
        const title = req.body.title;

        Board.createList(boardId, { title })
            .then(list => res.status(201).json({ result: list }), next);
    },
});

module.exports = BoardController;
