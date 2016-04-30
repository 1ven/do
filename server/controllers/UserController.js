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
    }
});

function sanitize(value) {
    return value ? escape(value.trim()) : undefined;
};

module.exports = UserController;
