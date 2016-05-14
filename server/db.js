'use strict';

const fs = require('fs');
const Sequelize = require('sequelize');
const path = require('path');
const config = require('./config');

const sequelize = new Sequelize(config.db);
const models = {};

fs.readdirSync(path.join(__dirname, 'models'))
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        models[model.name] = model;
    });

Object.keys(models).forEach(modelName => {
    const model = models[modelName];
    if ('associate' in model) {
        model.associate(models);
    }
});

module.exports = { sequelize, models };
