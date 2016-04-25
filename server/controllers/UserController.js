'use strict';

const _ = require('lodash');
const escape = require('escape-html');
const User = require('../models/User');
const BaseController = require('./BaseController');

const UserController = _.assign({}, BaseController, {
    Model: User,

    register(req, res, next) {
        const props = _.assign({}, req.body, {
            username: escape(req.body.username.trim()),
            email: escape(req.body.email.trim())
        });

        return this.Model.register(props)
            .then(entry => res.status(201).json({ result: entry }), next);
    }
});

module.exports = UserController;
