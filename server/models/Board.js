'use strict';

const db = require('../db');
const Sequelize = require('sequelize');
const shortid = require('shortid');

const List = require('./List');

const Board = db.define('board', {
    id: {
        type: Sequelize.STRING,
        defaultValue: shortid.generate,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
            notEmpty: {
                args: true,
                msg: 'Board title must not be empty'
            }
        }
    }
}, {
    defaultScope: {
        attributes: ['id', 'title'],
        include: [{
            model: List
        }]
    }
});

module.exports = Board;
