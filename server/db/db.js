const Sequelize = require('sequelize');
const setup = require('./setup');

const db = setup(new Sequelize(config.db));

module.exports = db;
