const Sequelize = require('sequelize');
const setup = require('./setup');

const postgres = setup(new Sequelize(config.postgres));

module.exports = postgres;
