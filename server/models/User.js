'use strict';

const db = require('../db');
const Sequelize = require('sequelize');
const shortid = require('shortid');
const isUnique = require('../utils/sequelize-helpers').isUnique;

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
            // isUnique: isUnique(User, 'username')
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
            // isUnique: isUnique(User, 'email')
        }
    },
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
        attributes: ['id', 'username'],
        include: [{
            model: Board
        }],
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
