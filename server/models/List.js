'use strict';

const db = require('../db');
const Sequelize = require('sequelize');
const shortid = require('shortid');

const Card = require('./Card');

const List = db.define('list', {
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
                msg: 'List title must be not empty'
            }
        }
    }
}, {
    defaultScope: {
        attributes: ['id', 'title'],
        include: [{
            model: Card
        }]
    }
});

module.exports = List;
