'use strict';

const _ = require('lodash');
const escape = require('escape-html');
const User = require('../models/User');
const BaseController = require('./BaseController');

const UserController = _.assign({}, BaseController, {
    Model: User,

    register(req, res, next) {
        const props = _.assign({}, req.body, {
            username: sanitize(req.body.username),
            email: sanitize(req.body.email)
        });

        return this.Model.register(props)
            .then(user => res.status(201).json({ result: user }), next);
    },

    createBoard(req, res, next) {
        const userId = parseInt(req.params.id);
        const title = req.body.title;

        User.createBoard(userId, { title })
            .then(board => res.status(201).json({ result: board }), next);
    },

    getBoards(req, res, next) {
        const userId = parseInt(req.params.id);

        User.getWithChildrenOne({ id: userId })
            .then(user => res.status(200).json({ result: user.boards }), next);
    }
});

function sanitize(value) {
    return value ? escape(value.trim()) : undefined;
};

module.exports = UserController;
