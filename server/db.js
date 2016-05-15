'use strict';

const fs = require('fs');
const Sequelize = require('sequelize');
const path = require('path');
const config = require('./config');

const modelsDir = path.join(__dirname, 'models');
const sequelize = new Sequelize(config.db, {
    logging: false
});
const models = {};

fs.readdirSync(modelsDir)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(file => {
        const model = sequelize.import(path.join(modelsDir, file));
        models[model.name] = model;
    });

Object.keys(models).forEach(modelName => {
    const model = models[modelName];
    if ('associate' in model) {
        model.associate(models);
    }
});

module.exports = { Sequelize, sequelize, models };
