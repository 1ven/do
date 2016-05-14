'use strict';

const shortid = require('shortid');

module.exports = function (sequelize, DataTypes) {
    const Card = sequelize.define('Card', {
        id: {
            type: DataTypes.STRING,
            defaultValue: shortid.generate,
            primaryKey: true
        },
        text: {
            type: DataTypes.STRING,
            validate: {
                min: {
                    args: 1,
                    msg: 'Card text must be not empty'
                }
            }
        }
    });

    return Card;
};
