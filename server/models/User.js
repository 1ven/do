'use strict';

const db = require('../db');
const Sequelize = require('sequelize');
const shortid = require('shortid');

const Board = require('./Board');

const User = db.define('user', {
    id: {
        type: Sequelize.STRING,
        defaultValue: shortid.generate,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
            notEmpty: {
                args: true,
                msg: 'Username is required'
            },
            len: {
                args: [3, 20],
                msg: 'Username must be between 3 and 20 charachters length'
            },
            is: {
                args: /^\S*$/g,
                msg: 'Username must not contain spaces'
            },
            isUnique: function (username, next) {
                User.count({ where: { username } })
                    .then(length => {
                        if (length) { return next('Username is already in use') }
                        next();
                    })
                    .catch(next);
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
            notEmpty: {
                args: true,
                msg: 'Email is required'
            },
            isEmail: {
                args: true,
                msg: 'Email is not valid'
            },
            isUnique: function (email, next) {
                User.count({ where: { email } })
                    .then(length => {
                        if (length) { return next('Email is already in use') }
                        next();
                    })
                    .catch(next);
            }
        }
    },
    password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        set: function (val) {
            this.setDataValue('password', val);
        },
        validate: {
            notEmpty: {
                args: true,
                msg: 'Password is required'
            },
            min: {
                args: 6,
                msg: 'Password must be at least 6 characters length'
            }
        }
    }
    // hash: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    // salt: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // }
}, {
    hooks: {
        beforeValidate(user) {
            user.username = user.username.toLowerCase();
            user.email = user.email.toLowerCase();
        }
    },
    defaultScope: {
        attributes: ['id', 'username']
    },
    scopes: {
        self: {
            attributes: ['id', 'username', 'email'],
            include: [{
                model: Board
            }]
        },
    }
});

module.exports = User;
