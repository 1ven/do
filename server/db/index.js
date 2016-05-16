'use strict';

const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.db, {
    logging: false
});

module.exports = sequelize;
