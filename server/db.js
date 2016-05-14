'use strict';

const fs = require('fs');
const Sequelize = require('sequelize');
const path = require('path');
const config = require('./config');

module.exports = function (sequelize) {
    const db = {};

    fs.readdirSync(path.join(__dirname, 'models'))
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== 'index.js');
        })
        .forEach(file => {
            const model = sequelize.import(path.join(__dirname, file));
            db[model.name] = model;
        });

    Object.keys(db).forEach(modelName => {
        const model = db[modelName];
        if ('associate' in model) {
            model.associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
};
