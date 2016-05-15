'use strict';

const db = require('../db');
const Sequelize = require('sequelize');
const shortid = require('shortid');

const Card = db.define('card', {
    id: {
        type: Sequelize.STRING,
        defaultValue: shortid.generate,
        primaryKey: true
    },
    text: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
            notEmpty: {
                args: true,
                msg: 'Card text must be not empty'
            }
        }
    }
}, {
    defaultScope: {
        attributes: ['id', 'text']
    }
});

module.exports = Card;
