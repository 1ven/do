'use strict';

const shortid = require('shortid');

module.exports = function (sequelize, DataTypes) {
    const Board = sequelize.define('Board', {
        id: {
            type: DataTypes.STRING,
            defaultValue: shortid.generate,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            validate: {
                min: {
                    args: 1,
                    msg: 'Board title must not be empty'
                }
            }
        }
    }, {
        classMethods: {
            associate(models) {
                Board.hasMany(models.List);
            }
        }
    });

    return Board;
};
